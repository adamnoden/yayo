import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { StockPicker } from "./StockPicker";
import { StockInfo } from "./StockInfo";

interface Props {
  fundLevel: number;
}
export const CapitalAllocationForm: React.FC<Props> = ({ fundLevel }) => {
  const [ticker, setTicker] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);

  const handleAlloc = () => {
    console.log("todo");
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
