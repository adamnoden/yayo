import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

interface FundData {
  name: string;
  adminUid: string;
  createdAt: FirebaseFirestore.FieldValue;
  performanceStats: {
    totalGainsLosses: number;
    weeklyPerformance: object;
    winLossRatio: { wins: number; losses: number };
    bestPerformance: object;
    worstPerformance: object;
    averageWeeklyReturn: number;
    mostProfitableInvestments: any[];
  };
  memberLeaderboard: any[];
  memberUids: string[];
  level: number;
}

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

    const fundData: FundData = {
      name,
      adminUid,
      memberUids: [adminUid], // Initialize with the creator as the first member
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      performanceStats: {
        totalGainsLosses: 0,
        weeklyPerformance: {},
        winLossRatio: { wins: 0, losses: 0 },
        bestPerformance: {},
        worstPerformance: {},
        averageWeeklyReturn: 0,
        mostProfitableInvestments: [],
      },
      memberLeaderboard: [],
      level: 1, // Initialize fund level
    };

    // Add the fund to the database
    try {
      const docRef = await admin.firestore().collection("funds").add(fundData); // Note the lowercase 'funds'
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
