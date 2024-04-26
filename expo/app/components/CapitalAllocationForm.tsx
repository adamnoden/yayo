import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import { StockPicker } from "./StockPicker";
import { StockInfo } from "./StockInfo";
import { useAllocateCapital } from "../hooks/useAllocateCapital";
import { MarketStatusComponent } from "./MarketStatus";

interface AllocationMap {
  [level: number]: number;
}

export const FUND_LEVEL_ALLOCATION_MAP: AllocationMap = {
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
  fundId: string;
}
export const CapitalAllocationForm: React.FC<Props> = ({
  fundLevel,
  fundId,
}) => {
  const [ticker, setTicker] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);
  const [quotePriceTime, setQuotePriceTime] = useState<number | null>(null);

  const { allocateCapital, loading, error, success } = useAllocateCapital();

  const handleAlloc = () => {
    const now = Date.now();

    if (!ticker || !quotePriceTime) {
      console.error("No ticker selected");
      return;
    }

    if (now - quotePriceTime < 5_000 * 60) {
      console.error("Need to update quote");
      // TODO: timer for this and show on UI
      //   return;
    }

    allocateCapital(ticker, fundId);
  };

  const updateQuotePrice = (price: number | null) => {
    setQuotePrice(price);
    setQuotePriceTime(Date.now());
  };

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
        <StockInfo
          ticker={ticker}
          quotePrice={quotePrice}
          setQuotePrice={updateQuotePrice}
        />
      </View>

      <View style={[styles.componentContainer]}>
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        {error && <Text>Error: {error}</Text>}
        {success && <Text>Allocation Successful!</Text>}
      </View>

      <Button
        disabled={!quotePrice}
        onPress={handleAlloc}
        title="Allocate Funds"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingTop: 50, // Adjust based on your screen layout
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
  },
});
