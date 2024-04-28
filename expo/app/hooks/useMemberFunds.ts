import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Fund, FundData } from "../../common";

export const useMemberFunds = () => {
  const [funds, setFunds] = useState<Fund[] | null>(null);
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

        const fetchedFunds = querySnapshot.docs.map((doc) => {
          const rawData = doc.data() as FundData;
          return {
            ...rawData,
            id: doc.id,
            createdAt: rawData.createdAt.toDate(),
          };
        });

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
