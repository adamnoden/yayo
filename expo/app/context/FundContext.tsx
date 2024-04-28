import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAdminFunds } from "../hooks/useAdminFunds";
import { useMemberFunds } from "../hooks/useMemberFunds";
import { getFirestore, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { Fund } from "../../common";

interface FundContextType {
  adminFunds: Fund[] | null;
  loadingAdminFunds: boolean;
  errorAdminFunds: Error | null;
  refetchAdminFunds: () => Promise<void>;
  memberFunds: Fund[] | null;
  loadingMemberFunds: boolean;
  errorMemberFunds: Error | null;
  allFunds: Fund[];
}

const FundContext = createContext<FundContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}
export const FundProvider: React.FC<Props> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<{
    [k: string]: Unsubscribe;
  }>({});
  const [allFunds, setAllFunds] = useState<Fund[]>([]);
  const db = getFirestore(); // Get Firestore instance

  const {
    funds: adminFunds,
    loading: loadingAdminFunds,
    error: errorAdminFunds,
    refetch: refetchAdminFunds,
  } = useAdminFunds();

  const {
    funds: memberFunds,
    loading: loadingMemberFunds,
    error: errorMemberFunds,
  } = useMemberFunds();

  useEffect(() => {
    // Subscribe to all admin and member funds for real-time updates
    const allFundIds = [...(adminFunds || []), ...(memberFunds || [])].map(
      (f) => f.id
    );
    allFundIds.forEach((fundId) => {
      if (!subscriptions[fundId]) {
        const unsubscribe = onSnapshot(
          doc(db, "funds", fundId),
          (doc) => {
            console.log("Fund snapshot update", fundId);
            if (doc.exists()) {
              const updatedFund = { ...doc.data(), id: doc.id } as Fund;
              addOrUpdateFund(updatedFund);
            }
          },
          (err) => {
            console.error(
              `Failed to subscribe to updates for fund ${fundId}:`,
              err
            );
          }
        );

        setSubscriptions((prev) => ({ ...prev, [fundId]: unsubscribe }));
      }
    });

    // Clean up subscriptions on unmount
    return () => {
      Object.values(subscriptions).forEach((unsubscribe) => unsubscribe());
    };
  }, [adminFunds, memberFunds]); // Rerun effect if list of funds changes

  // Update allFunds state when any fund data changes
  const addOrUpdateFund = (updatedFund: Fund) => {
    setAllFunds((prevFunds) => {
      const fundIndex = prevFunds.findIndex((f) => f.id === updatedFund.id);
      if (fundIndex !== -1) {
        const newFunds = [...prevFunds];
        newFunds[fundIndex] = updatedFund;
        return newFunds;
      } else {
        return [...prevFunds, updatedFund];
      }
    });
  };

  return (
    <FundContext.Provider
      value={{
        adminFunds,
        loadingAdminFunds,
        errorAdminFunds,
        refetchAdminFunds,
        memberFunds,
        loadingMemberFunds,
        errorMemberFunds,
        allFunds,
      }}
    >
      {children}
    </FundContext.Provider>
  );
};

export const useFunds = () => {
  const context = useContext(FundContext);
  if (context === undefined) {
    throw new Error("useFunds must be used within a FundContext");
  }
  return context;
};
