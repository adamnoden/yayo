import React, { createContext, useContext, ReactNode } from "react";
import { useAdminFunds } from "../hooks/useAdminFunds";
import { useMemberFunds } from "../hooks/useMemberFunds";
import { Fund } from "../../../types";

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

  const allFunds = [...(adminFunds || []), ...(memberFunds || [])];

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
