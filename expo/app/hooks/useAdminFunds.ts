import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!user) {
      setLoading(false); // Possibly handle this scenario differently
      return;
    }

    const db = getFirestore();
    const fetchFunds = async () => {
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
