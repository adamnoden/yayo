import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

export const useAllocateCapital = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const allocateCapital = async (stockSymbol: string, fundId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const addCapitalAllocation = httpsCallable(
      getFunctions(),
      "addCapitalAllocation"
    );

    try {
      const result = await addCapitalAllocation({ stockSymbol, fundId });
      setLoading(false);
      setSuccess(true);
      console.log("Allocation success:", result.data);
      return result.data;
    } catch (err) {
      console.error("Error calling addCapitalAllocation:", err);
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw error;
    }
  };

  return { allocateCapital, loading, error, success };
};
