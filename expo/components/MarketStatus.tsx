import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getMarketStatus, MarketStatus } from "../utils";

export function MarketStatusComponent() {
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);

  useEffect(() => {
    const checkMarketStatus = () => {
      setMarketStatus(getMarketStatus());
    };

    checkMarketStatus();
    // Optionally, set an interval to regularly check the market status
    const interval = setInterval(checkMarketStatus, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const marketOpen = marketStatus && marketStatus.isOpen;
  const closeReason = marketStatus && marketStatus.reason;
  return (
    <View style={styles.container}>
      <Text style={[styles.status, marketOpen ? styles.open : styles.closed]}>
        Market {marketOpen ? "OPEN" : "CLOSED"}
        {closeReason && `: ${closeReason}`}
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
