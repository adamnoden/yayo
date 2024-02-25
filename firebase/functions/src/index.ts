import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as https from "https";
import { FieldValue } from "firebase-admin/firestore";

admin.initializeApp();
const finnhubApiKey = functions.config().finnhub.key;

const ONE_HOUR_MS = 60 * 60 * 1000;

async function fetchStockPriceFromAPI(ticker: string): Promise<number> {
  const finnhubBaseUrl = "https://finnhub.io/api/v1";
  const url = `${finnhubBaseUrl}/quote?symbol=${ticker}&token=${finnhubApiKey}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let rawData = "";
        response.on("data", (chunk) => (rawData += chunk));
        response.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData.c); // 'c' for current price
          } catch (error) {
            reject(
              new Error(
                `Parsing error: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`
              )
            );
          }
        });
      })
      .on("error", (error) =>
        reject(new Error(`HTTPS request failed: ${error.message}`))
      );
  });
}

export const fetchStockPrice = functions.https.onCall(
  async (data, _context) => {
    const ticker = data.ticker;
    const collectionName = "stock_prices";
    const db = admin.firestore();

    // Try to get the cached price first
    let price;
    let source;
    try {
      const cacheResult = await db
        .collection(collectionName)
        .where("ticker", "==", ticker)
        .where("timestamp", ">=", new Date(Date.now() - ONE_HOUR_MS))
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();

      if (!cacheResult.empty) {
        const cachedData = cacheResult.docs[0].data();
        price = cachedData.price;
        source = "cache";
      } else {
        // No cache found, fetch new price
        price = await fetchStockPriceFromAPI(ticker);
        source = "api";
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
        await db.collection(collectionName).add({
          ticker,
          price,
          timestamp: FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error("Failed to cache stock price:", error);
        // Log the error but do not throw, as we still want to return the API response
      }
    }

    // Return the price and source regardless of caching outcome
    return { price, source };
  }
);
