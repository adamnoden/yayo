import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { fetchPrice } from "./fetchStockPrice";

interface AllocationData {
  stockSymbol: string;
  fundId: string;
}
export const addCapitalAllocation = functions.https.onCall(
  async (data: AllocationData, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The user must be authenticated."
      );
    }

    const symbol = data.stockSymbol;
    const fundId = data.fundId;

    // TODO: fetch fund
    // get fund level
    // validate user hasn't allocated yet

    try {
      // Fetch stock price using the previously defined Cloud Function
      const priceResult = await fetchPrice(symbol);
      const price = priceResult.price;
      if (!price) {
        throw new Error("Price fetch error");
      }

      // Calculate shares such that the total investment is as close to $100 as possible without exceeding it
      // TODO: get from fund level
      const amountToInvest = 100;
      const shares = Math.floor(amountToInvest / price);

      const allocation = {
        uid: context.auth.uid,
        stockSymbol: symbol,
        shares: shares,
        buyPrice: price,
        buyTimestamp: FieldValue.serverTimestamp(),
      };

      // Update Firestore document
      const fundRef = admin.firestore().doc(`funds/${fundId}`);
      return fundRef.update({
        capitalAllocations: FieldValue.arrayUnion(allocation),
      });
    } catch (error) {
      console.error("Error adding capital allocation: ", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error processing capital allocation",
        error
      );
    }
  }
);
