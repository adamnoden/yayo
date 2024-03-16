import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import {
  ACCOUNT_BALANCES_COLLECTION_NAME,
  STOCK_PICKS_COLLECTION_NAME,
} from "../constants";

export const sellStockPick = functions.https.onCall(async (data, _context) => {
  const {
    pickId,
    userId,
    sellPrice, // this will come from a backend query to be extra proper but for now just pass through what was last queried from the front end
  } = data;
  const stockPicksRef = admin
    .firestore()
    .collection(STOCK_PICKS_COLLECTION_NAME);
  const accountBalancesRef = admin
    .firestore()
    .collection(ACCOUNT_BALANCES_COLLECTION_NAME);

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
