import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BidPlacer } from "../../components/BidPlacer";
import { StockPicker } from "../../components/StockPicker";
import { StockInfo } from "../../components/StockInfo";
import UserBalance from "../../components/UserBalance";
import { MarketStatus } from "../../components/MarketStatus";
import { Link } from "expo-router";

const App = () => {
  const [ticker, setTicker] = useState<string | null>(null);
  const [tradeEventNonce, setTradeEventNonce] = useState<number>(0);
  const [quotePrice, setQuotePrice] = useState<number | null>(null);

  const handleTradeEvent = () => {
    setTradeEventNonce((prev) => prev + 1);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <MarketStatus />
      </View>
      <View style={[styles.componentContainer, styles.greenBorder]}>
        <UserBalance tradeEventNonce={tradeEventNonce} />
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

export default App;
