import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

import { getQuote } from "../services/finhubb";
import { STOCK_PRICE_COLLECTION_NAME } from "../constants";

const ONE_HOUR_MS = 60 * 60 * 1000;

type PriceSource = "api" | "cache";

export const fetchStockPrice = functions.https.onCall(
  async (data, _context) => {
    const ticker = data.ticker;
    const db = admin.firestore();

    // Try to get the cached price first
    let price;
    let source: PriceSource;
    let timestamp;
    try {
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
        // No cache found, fetch new price

        // local tests
        if (ticker.startsWith("YAYO-TEST-TICKER")) {
          price = 101;
        } else {
          price = await getQuote(ticker);
        }
        source = "api";
        timestamp = FieldValue.serverTimestamp();
      }
    } catch (error) {
      console.error("Error with cache lookup or API fetch:", error);
      // If both cache and API fetch failed, throw an error
      throw new functions.https.HttpsError(
        "internal",
        "Unable to fetch stock price."
      );
    }

    // Attempt to cache the new price if fetched from API
    if (source === "api") {
      try {
        await db.collection(STOCK_PRICE_COLLECTION_NAME).add({
          ticker,
          price,
          timestamp,
        });
      } catch (error) {
        console.error("Failed to cache stock price:", error);
        // Log the error but do not throw, as we still want to return the API response
      }
    }

    const returnTimestamp =
      source === "api"
        ? new Date().toISOString()
        : timestamp.toDate().toISOString();

    // Return the price and source regardless of caching outcome
    return {
      price,
      source,
      timestamp: returnTimestamp,
    };
  }
);
