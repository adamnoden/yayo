import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { STOCK_LIST } from "../../constants/stock-list";
import { StockPicker } from "./StockPicker";
import { StockInfo } from "./StockInfo";

export const CapitalAllocationForm: React.FC = () => {
  const [ticker, setTicker] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <StockPicker onChange={(t) => setTicker(t)} />
      <StockInfo
        ticker={ticker}
        quotePrice={quotePrice}
        setQuotePrice={setQuotePrice}
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
