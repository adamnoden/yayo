import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Assuming the same AuthContext usage

export const useMemberFunds = () => {
  const [funds, setFunds] = useState<object[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const fetchFunds = async () => {
      try {
        const q = query(
          collection(db, "funds"),
          where("memberUids", "array-contains", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const fetchedFunds: any[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredFunds = fetchedFunds.filter(
          (fund) => fund.adminUid !== user.uid
        );
        setFunds(filteredFunds);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, [user]);

  return { funds, loading, error };
};
