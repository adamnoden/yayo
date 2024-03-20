import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BidPlacer } from "./src/components/BidPlacer";
import { StockPicker } from "./src/components/StockPicker";
import { StockInfo } from "./src/components/StockInfo";
import UserBalance from "./src/components/UserBalance";

const App = () => {
  const [ticker, setTicker] = useState<string | null>(null);
  const [tradeEventNonce, setTradeEventNonce] = useState<number>(0);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);

  const handleTradeEvent = () => {
    setTradeEventNonce((prev) => prev + 1);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer, styles.greenBorder]}>
        <UserBalance tradeEventNonce={tradeEventNonce} />
      </View>
      <View style={[styles.componentContainer, styles.redBorder]}>
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
        <BidPlacer
          ticker={ticker}
          quotePrice={quotePrice}
          onTradeEvent={handleTradeEvent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentContainer: {
    width: "90%", // Adjust based on your layout needs
    marginBottom: 20, // Adds space between the components
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

export default App;
