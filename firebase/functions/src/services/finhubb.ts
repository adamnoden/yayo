import * as functions from "firebase-functions";
import * as https from "https";

const finnhubApiKey = functions.config().finnhub.key;

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export async function fetchStockPriceFromAPI(ticker: string): Promise<number> {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${ticker}&token=${finnhubApiKey}`;

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
