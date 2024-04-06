import { useState, useEffect, useCallback } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useAdminFunds = () => {
  const [funds, setFunds] = useState<object[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchFunds = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const db = getFirestore();
    try {
      const q = query(
        collection(db, "funds"),
        where("adminUid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedFunds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFunds(fetchedFunds);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  return { funds, loading, error, refetch: fetchFunds };
};
