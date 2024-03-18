import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import {
  ACCOUNT_BALANCES_COLLECTION_NAME,
  STOCK_PICKS_COLLECTION_NAME,
} from "../constants";

export const addStockPick = functions.https.onCall(async (data, _context) => {
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }

  try {
    const accountBalancesRef = admin
      .firestore()
      .collection(ACCOUNT_BALANCES_COLLECTION_NAME);

    const accountDoc = await accountBalancesRef.doc(data.userId).get();
    let newBalance;
    if (accountDoc.exists) {
      const accountData = accountDoc.data();
      if (!accountData) {
        throw new functions.https.HttpsError(
          "data-loss",
          "Failed to retrieve account data."
        );
      }

      const cost = data.shares * data.buyPrice;
      console.log(cost);
      console.log(accountData.balance);
      if (cost > accountData.balance) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "Insufficient user balance"
        );
      }
      newBalance = accountData.balance - cost;

      // Update the user's account balance
      await accountBalancesRef
        .doc(data.userId)
        .set({ balance: newBalance }, { merge: true });
    } else {
      console.log("User account balance didnt exist");
      // TODO: enable
      // throw new functions.https.HttpsError(
      //   "failed-precondition",
      //   "User balance was not initialised"
      // );
    }
  } catch (error) {
    console.error("Error updating user balance : ", error);
    throw new functions.https.HttpsError(
      "unknown",
      "Failed to update user balance",
      error
    );
  }

  try {
    const docRef = await admin
      .firestore()
      .collection(STOCK_PICKS_COLLECTION_NAME)
      .add({
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
