import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Fund } from "../../../../types";

export const createFund = functions.https.onCall(
  async (data: { name: string }, context) => {
    // Check authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The user must be authenticated to create a fund."
      );
    }

    // Extract and validate data
    const { name } = data;

    if (!name) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a 'name' argument."
      );
    }

    if (name.length < 5 || name.length > 16) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The 'name' must be between 5 and 16 characters long."
      );
    }

    const adminUid = context.auth.uid;

    const fundData: Fund = {
      name,
      adminUid,
      memberUids: [adminUid],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      memberLeaderboard: [],
      level: 1, // Initialize fund level
    };

    try {
      const docRef = await admin.firestore().collection("funds").add(fundData);
      console.log("Fund created with ID: ", docRef.id);
      return { fundId: docRef.id };
    } catch (error) {
      console.error("Error creating fund: ", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to create fund."
      );
    }
  }
);
