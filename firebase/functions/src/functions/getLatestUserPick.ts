import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { STOCK_PICKS_COLLECTION_NAME } from "../constants";

export const getLatestUserPick = functions.https.onCall(
  async (data, _context) => {
    // if (!context.auth) {
    //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    // }

    try {
      const userPicksSnapshot = await admin
        .firestore()
        .collection(STOCK_PICKS_COLLECTION_NAME)
        .where("userId", "==", data.userId)
        .where("isSold", "==", false)
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
