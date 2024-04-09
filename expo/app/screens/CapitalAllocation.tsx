import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BidPlacer } from "../components/BidPlacer";
import { StockPicker } from "../components/StockPicker";
import { StockInfo } from "../components/StockInfo";
import { MarketStatusComponent } from "../components/MarketStatus";

interface AllocationMap {
  [level: number]: number;
}

const FUND_LEVEL_ALLOCATION_MAP: AllocationMap = {
  1: 100,
  2: 1_000,
  3: 10_000,
  4: 50_000,
  5: 100_000,
  6: 250_000,
  7: 1_000_000,
};
interface Props {
  fundLevel: number;
}
export const CapitalAllocation: React.FC<Props> = ({ fundLevel }) => {
  const [ticker, setTicker] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);

  const allocationAmount = FUND_LEVEL_ALLOCATION_MAP[fundLevel];

  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <MarketStatusComponent />
      </View>
      <View style={[styles.componentContainer]}>
        Your allocation allowance: ${allocationAmount}
      </View>
      <View style={[styles.componentContainer]}>
        <StockPicker onChange={(t) => setTicker(t)} />
      </View>
      <View style={[styles.componentContainer, styles.blueBorder]}>
        <StockInfo
          ticker={ticker}
          quotePrice={quotePrice}
          setQuotePrice={setQuotePrice}
        />
      </View>

      <View style={[styles.componentContainer, styles.greenBorder]}>
        {/* <BidPlacer ticker={ticker} quotePrice={quotePrice} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
  },
  redBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  blueBorder: {
    borderColor: "blue",
    borderWidth: 1,
  },
  greenBorder: {
    borderColor: "green",
    borderWidth: 1,
  },
});
