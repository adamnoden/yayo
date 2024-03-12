import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StockInfo, StockPicker } from "./src/components";
import { BidPlacer } from "./src/components/BidPlacer";

const App = () => {
  const [ticker, setTicker] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer, styles.redBorder]}>
        <StockPicker onChange={(t) => setTicker(t)} />
      </View>
      <View style={[styles.componentContainer, styles.blueBorder]}>
        <StockInfo ticker={ticker} />
      </View>

      <View style={[styles.componentContainer, styles.greenBorder]}>
        <BidPlacer ticker={ticker} />
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
    borderWidth: 2,
  },
  blueBorder: {
    borderColor: "blue",
    borderWidth: 2,
  },
  greenBorder: {
    borderColor: "blue",
    borderWidth: 2,
  },
});

export default App;
