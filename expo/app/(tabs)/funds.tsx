import React, { useState } from "react";
import { FundsOverview } from "../screens/FundsOverview";
import { FundDetails } from "../screens/FundDetails";

const Funds: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectFund = (fundId: string) => {
    console.log(fundId);
    setSelected(fundId);
  };

  const resetSelection = () => {
    setSelected(null);
  };

  if (selected) {
    return <FundDetails fundId={selected} returnToOverView={resetSelection} />;
  }
  return <FundsOverview handleFundSelect={selectFund} />;
};

export default Funds;
