import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { getQuote } from "../services/finhubb";
import { STOCK_PRICE_COLLECTION_NAME } from "../constants";

const ONE_HOUR_MS = 60 * 60 * 1000;

type PriceSource = "api" | "cache";

interface StockPriceData {
  ticker: string;
}

interface StockPriceResponse {
  price: number;
  source: PriceSource;
  timestamp: string; // ISO string format for timestamp
}

export async function fetchPrice(ticker: string): Promise<StockPriceResponse> {
  const db = admin.firestore();
  let price: number;
  let source: "api" | "cache";
  let timestamp: FieldValue | Timestamp;

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
    if (ticker.startsWith("YAYO-TEST-TICKER")) {
      price = 101;
    } else {
      price = await getQuote(ticker);
    }
    source = "api";
    timestamp = admin.firestore.FieldValue.serverTimestamp();
  }

  // Return structured data
  return {
    price,
    source,
    timestamp: (source === "api"
      ? new Date()
      : (timestamp as admin.firestore.Timestamp).toDate()
    ).toISOString(),
  };
}

export const fetchStockPrice = functions.https.onCall(
  async (data: StockPriceData, context): Promise<StockPriceResponse> => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The user must be authenticated to fetch stock price."
      );
    }

    if (!data.ticker) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function requires a ticker."
      );
    }

    try {
      const result = await fetchPrice(data.ticker);
      return result;
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Unable to fetch stock price.",
        error
      );
    }
  }
);
