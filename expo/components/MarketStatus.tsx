import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { isMarketOpen } from "../utils";

export function MarketStatus() {
  const [marketOpen, setMarketOpen] = useState(false);

  useEffect(() => {
    const checkMarketStatus = () => {
      setMarketOpen(isMarketOpen());
    };

    checkMarketStatus();
    // Optionally, set an interval to regularly check the market status
    const interval = setInterval(checkMarketStatus, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.status, marketOpen ? styles.open : styles.closed]}>
        Market {marketOpen ? "OPEN" : "CLOSED"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  status: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontWeight: "bold",
    width: 150,
    textAlign: "center",
    color: "white",
  },
  open: {
    backgroundColor: "green",
  },
  closed: {
    backgroundColor: "red",
  },
});
