import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebaseConfig";

interface FetchStockResponse {
  price: number;
  source: string;
  timestamp: string;
}

export async function callFetchStockPrice(
  ticker: string
): Promise<FetchStockResponse> {
  const fetchStockPrice = httpsCallable(functions, "fetchStockPrice");

  try {
    const response = await fetchStockPrice({ ticker });
    console.log("Stock Price:", response.data);
    return response.data as FetchStockResponse;
  } catch (error) {
    console.error("Error calling fetchStockPrice:", error);
    throw error;
  }
}

interface AddPickResponse {
  success: boolean;
  id?: string; // Optional, assuming it's returned only on success
  message?: string; // Optional message, could be used for error messages or confirmations
}
export async function addStockPick(
  userId: string,
  ticker: string,
  shares: number,
  buyPrice: number
): Promise<AddPickResponse> {
  const data = {
    userId,
    ticker,
    shares,
    buyPrice,
  };

  try {
    const response = await httpsCallable(functions, "addStockPick")(data);
    console.log("addStockPick response:", response.data);
    return response.data as AddPickResponse;
  } catch (error) {
    console.error("Error calling addStockPick:", error);
    throw error;
  }
}

export const sellStockPick = async (
  pickId: string,
  userId: string,
  sellPrice: number // TODO: this should come from the server
) => {
  try {
    const sellStockPickCallable = httpsCallable(functions, "sellStockPick");
    const result = await sellStockPickCallable({ pickId, userId, sellPrice });
    return result.data;
  } catch (error) {
    console.error("Error selling stock pick:", error);
    throw error;
  }
};

export interface Pick {
  userId: string;
  ticker: string;
  shares: number;
  buyPrice: number;
  buyTimestamp: string; // Assuming the date is returned as a string
  lastFetchedPrice?: number;
  lastFetchedTimestamp?: string; // Optional, if you decide to include fetching logic later
  isSold: boolean;
  sellPrice: number | null;
  sellTimestamp: string | null;
}

interface GetPickResponse {
  pickId: string;
  success: boolean;
  latestPick?: Pick;
  message?: string; // Optional, for errors or informational messages
}
export async function getLatestUserPick(
  userId: string
): Promise<GetPickResponse> {
  try {
    const response = await httpsCallable(
      functions,
      "getLatestUserPick"
    )({ userId });
    console.log("getLatestUserPick response:", response.data);
    return response.data as GetPickResponse;
  } catch (error) {
    console.error("Error calling getLatestUserPick:", error);
    throw error;
  }
}
