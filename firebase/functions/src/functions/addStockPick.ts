import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { STOCK_PICKS_COLLECTION_NAME } from "../constants";

export const addStockPick = functions.https.onCall(async (data, _context) => {
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }

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
