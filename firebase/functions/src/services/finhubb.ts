import * as functions from "firebase-functions";
import axios from "axios";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const finnhubApiKey = functions.config().finnhub.key;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export async function getQuote(ticker: string): Promise<number> {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${ticker}&token=${finnhubApiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.c; // 'c' for current price
  } catch (error: unknown) {
    const errorMessage = `Fetching stock price failed: ${extractErrorMessage(
      error
    )}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
