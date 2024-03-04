import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebaseConfig";

interface ResponseData {
  price: number;
  source: string;
  timestamp: string;
}

export async function callFetchStockPrice(
  ticker: string
): Promise<ResponseData> {
  const fetchStockPrice = httpsCallable(functions, "fetchStockPrice");

  try {
    const response = await fetchStockPrice({ ticker });
    console.log("Stock Price:", response.data);
    return response.data as ResponseData;
  } catch (error) {
    console.error("Error calling fetchStockPrice:", error);
    throw error; // Or handle the error as needed
  }
}
