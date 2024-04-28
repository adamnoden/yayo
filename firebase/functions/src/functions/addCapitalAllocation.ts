import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { fetchPrice } from "./fetchStockPrice";
import { LiveCapitalAllocation } from "../common";

// TODO: have some specific types folder for function inputs and outputs
interface AllocationData {
  stockSymbol: string;
  fundId: string;
}

export const addCapitalAllocation = functions.https.onCall(
  async (data: AllocationData, context) => {
    if (!context.auth || !context.auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The user must be authenticated."
      );
    }

    const { stockSymbol, fundId } = data;
    const userUid = context.auth.uid;

    const fundRef = admin.firestore().doc(`funds/${fundId}`);
    const fundSnapshot = await fundRef.get();

    if (!fundSnapshot.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "Fund not found with the given ID. This is unexpected"
      );
    }

    const fundData = fundSnapshot.data();
    if (!fundData) {
      throw new functions.https.HttpsError(
        "not-found",
        "No data found for the fund. This is unexpected"
      );
    }

    // Verify user is an admin or a member
    const isAdmin = fundData.adminUid === userUid;
    const isMember =
      fundData.memberUids && fundData.memberUids.includes(userUid);
    if (!isAdmin && !isMember) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User is neither an admin nor a member of the fund. This is unexpected"
      );
    }

    // Validate user hasn't allocated yet
    if (fundData.capitalAllocations && fundData.capitalAllocations[userUid]) {
      throw new functions.https.HttpsError(
        "already-exists",
        "User has already made an allocation. This is unexpected"
      );
    }

    // Proceed to fetch stock price and calculate allocation
    // TODO: maybe pass the quote price into the fn and fallback on that
    const priceResult = await fetchPrice(stockSymbol);
    const price = priceResult.price;
    if (!price) {
      throw new Error("Price fetch error");
    }

    const amountToInvest = 100; // This will be dynamic based on fund level (shared const in common)
    const shares = Math.floor(amountToInvest / price);

    const allocation: LiveCapitalAllocation = {
      stockSymbol: stockSymbol,
      sharesBought: shares,
      buyPrice: price,
      buyTimestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Prepare the update object using the user UID as the key
    const updateObject: { [k: string]: any } = {};
    updateObject[`capitalAllocations.${userUid}`] = allocation;

    // Update Firestore document
    return fundRef.update(updateObject);
  }
);
