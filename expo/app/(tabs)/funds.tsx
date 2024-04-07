import React, { useCallback, useState } from "react";
import { FundsOverview } from "../screens/FundsOverview";
import { FundDetails } from "../screens/FundDetails";
import { useFocusEffect } from "@react-navigation/native";

const Funds: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      // called when the tab gains focus

      return () => {
        // called when the tab goes out of focus
        resetSelection();
      };
    }, [])
  );

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
