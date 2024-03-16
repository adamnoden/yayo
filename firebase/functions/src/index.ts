import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { FieldValue } from "firebase-admin/firestore";
import { getQuote } from "./services/finhubb";

admin.initializeApp();

const ONE_HOUR_MS = 60 * 60 * 1000;
const STOCK_PRICE_COLLECTION_NAME = "stock_prices";
type PriceSource = "api" | "cache";

export const fetchStockPrice = functions.https.onCall(
  async (data, _context) => {
    const ticker = data.ticker;
    const db = admin.firestore();

    // Try to get the cached price first
    let price;
    let source: PriceSource;
    let timestamp;
    try {
      const cacheResult = await db
        .collection(STOCK_PRICE_COLLECTION_NAME)
        .where("ticker", "==", ticker)
        .where("timestamp", ">=", new Date(Date.now() - ONE_HOUR_MS))
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();

      if (!cacheResult.empty) {
        const cachedData = cacheResult.docs[0].data();
        price = cachedData.price;
        source = "cache";
        timestamp = cachedData.timestamp;
      } else {
        // No cache found, fetch new price
        price = await getQuote(ticker);
        source = "api";
        timestamp = FieldValue.serverTimestamp();
      }
    } catch (error) {
      console.error("Error with cache lookup or API fetch:", error);
      // If both cache and API fetch failed, throw an error
      throw new functions.https.HttpsError(
        "internal",
        "Unable to fetch stock price."
      );
    }

    // Attempt to cache the new price if fetched from API
    if (source === "api") {
      try {
        await db.collection(STOCK_PRICE_COLLECTION_NAME).add({
          ticker,
          price,
          timestamp,
        });
      } catch (error) {
        console.error("Failed to cache stock price:", error);
        // Log the error but do not throw, as we still want to return the API response
      }
    }

    const returnTimestamp =
      source === "api"
        ? new Date().toISOString()
        : timestamp.toDate().toISOString();

    // Return the price and source regardless of caching outcome
    return {
      price,
      source,
      timestamp: returnTimestamp,
    };
  }
);

export const addStockPick = functions.https.onCall(async (data, _context) => {
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }

  try {
    const docRef = await admin.firestore().collection("stock_picks").add({
      userId: data.userId,
      ticker: data.ticker,
      shares: data.shares,
      buyPrice: data.buyPrice,
      buyTimestamp: FieldValue.serverTimestamp(),
      sellPrice: null,
      sellTimestamp: null,
      isSold: false,
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding stock pick: ", error);
    throw new functions.https.HttpsError(
      "unknown",
      "Failed to add stock pick",
      error
    );
  }
});

export const sellStockPick = functions.https.onCall(async (data, _context) => {
  const {
    pickId,
    userId,
    sellPrice, // this will come from a backend query to be extra proper but for now just pass through what was last queried from the front end
  } = data;
  const stockPicksRef = admin.firestore().collection("stock_picks");
  const accountBalancesRef = admin.firestore().collection("account_balances");

  try {
    // Retrieve the stock pick to check its current status
    const pickDoc = await stockPicksRef.doc(pickId).get();

    if (!pickDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "Stock pick does not exist."
      );
    }

    const pickData = pickDoc.data();
    if (!pickData) {
      throw new functions.https.HttpsError(
        "data-loss",
        "Failed to retrieve stock pick data."
      );
    }

    // Check if the stock pick is already sold
    if (pickData.isSold) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "This stock pick has already been sold."
      );
    }

    // Update the stock pick with sell details
    await stockPicksRef.doc(pickId).update({
      sellPrice: sellPrice,
      sellTimestamp: FieldValue.serverTimestamp(),
      isSold: true,
    });

    const gainLoss = (sellPrice - pickData.buyPrice) * pickData.shares;

    // Retrieve or initialize the user's account balance
    const accountDoc = await accountBalancesRef.doc(userId).get();
    let newBalance;
    if (accountDoc.exists) {
      const accountData = accountDoc.data();
      if (!accountData) {
        throw new functions.https.HttpsError(
          "data-loss",
          "Failed to retrieve account data."
        );
      }
      newBalance = accountData.balance + gainLoss;
    } else {
      // Assuming starting balance is 0 if account document doesn't exist. later on will initialise a users account on registration
      newBalance = gainLoss;
    }
    newBalance = +newBalance.toFixed(2);

    // Update the user's account balance
    await accountBalancesRef
      .doc(userId)
      .set({ balance: newBalance }, { merge: true });

    return {
      success: true,
      message: "Stock pick sold successfully, account balance updated.",
    };
  } catch (error) {
    console.error("Error selling stock pick: ", error);
    throw new functions.https.HttpsError(
      "unknown",
      "Failed to sell stock pick",
      error
    );
  }
});

export const getLatestUserPick = functions.https.onCall(
  async (data, _context) => {
    // if (!context.auth) {
    //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    // }

    try {
      const userPicksSnapshot = await admin
        .firestore()
        .collection("stock_picks")
        .where("userId", "==", data.userId)
        .orderBy("buyTimestamp", "desc")
        .limit(1)
        .get();

      if (userPicksSnapshot.empty) {
        return { success: false, message: "No picks found for this user." };
      } else {
        const latestPick = userPicksSnapshot.docs[0].data();
        return {
          success: true,
          latestPick: latestPick,
          pickId: userPicksSnapshot.docs[0].id,
        };
      }
    } catch (error) {
      console.error("Error retrieving latest user pick: ", error);
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to retrieve latest pick",
        error
      );
    }
  }
);

export const getUserAccountBalance = functions.https.onCall(
  async (data, context) => {
    // Uncomment the lines below if you want to ensure that only authenticated users can fetch an account balance.
    // if (!context.auth) {
    //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    // }

    const userId = data.userId;
    if (!userId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        'The function must be called with one argument "userId".'
      );
    }

    try {
      const accountBalanceDoc = await admin
        .firestore()
        .collection("account_balances")
        .doc(userId)
        .get();

      if (!accountBalanceDoc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "User account balance does not exist."
        );
      }

      const accountBalanceData = accountBalanceDoc.data();
      if (!accountBalanceData) {
        throw new Error(
          "accountBalanceData did not exist. this was unexpected"
        );
      }
      return { balance: accountBalanceData.balance }; // Assuming the field that holds the balance is named 'balance'.
    } catch (error) {
      console.error("Error fetching user account balance: ", error);
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to fetch user account balance",
        error
      );
    }
  }
);
