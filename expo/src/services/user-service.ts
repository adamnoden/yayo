import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebaseConfig";

interface BalanceResponse {
  balance: number;
}

export const fetchUserAccountBalance = async (
  userId: string
): Promise<BalanceResponse> => {
  try {
    const fetchUserBalance = httpsCallable(functions, "getUserAccountBalance");

    const result = await fetchUserBalance({ userId });

    return result.data as BalanceResponse;
  } catch (error) {
    console.error("Failed to fetch user account balance:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};
