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

  const { allocateCapital, loading, error, success } = useAllocateCapital();

  const handleAlloc = () => {
    if (!ticker) {
      console.error("No ticker selected");
      return;
    }
    allocateCapital(ticker, fundId);
  };

  //   TODO: quote price should perhaps expire

  return (
    <View style={styles.container}>
      <StockPicker onChange={(t) => setTicker(t)} />
      <StockInfo
        ticker={ticker}
        quotePrice={quotePrice}
        setQuotePrice={setQuotePrice}
      />

      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {error && <Text>Error: {error}</Text>}
      {success && <Text>Allocation Successful!</Text>}

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
});
