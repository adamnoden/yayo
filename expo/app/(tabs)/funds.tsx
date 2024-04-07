import React from "react";
import { useMemberFunds } from "../hooks/useMemberFunds";
import { useAdminFunds } from "../hooks/useAdminFunds";
import { FundsOverview } from "../screens/FundsOverview";

const Funds: React.FC = () => {
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

  return (
    <FundsOverview
      adminFunds={adminFunds}
      loadingAdminFunds={loadingAdminFunds}
      errorAdminFunds={errorAdminFunds}
      refetchAdminFunds={refetchAdminFunds}
      memberFunds={memberFunds}
      loadingMemberFunds={loadingMemberFunds}
      errorMemberFunds={errorMemberFunds}
    />
  );
};

export default Funds;
