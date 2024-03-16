import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ACCOUNT_BALANCES_COLLECTION_NAME } from "../constants";

export const getUserAccountBalance = functions.https.onCall(
  async (data, _context) => {
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
        .collection(ACCOUNT_BALANCES_COLLECTION_NAME)
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
