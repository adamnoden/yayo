import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  Pick,
  addStockPick,
  getLatestUserPick,
} from "../services/stock-service";

interface Props {
  ticker: string | null;
}
export const BidPlacer: React.FC<Props> = ({ ticker }) => {
  const [latestPick, setLatestPick] = useState<Pick | undefined>();
  const userId = "demoUser"; // Hardcoded for demonstration
  const shares = 1; // Example share quantity
  const buyPrice = 100; // Example buy price, replace with real data or fetch method

  const [loadingAddPick, setLoadingAddPick] = useState(false);
  const [loadingFetchPick, setLoadingFetchPick] = useState(false);

  useEffect(() => {
    // Fetch the latest pick on component mount
    const fetchLatestPick = async () => {
      setLoadingFetchPick(true);
      try {
        const response = await getLatestUserPick(userId);
        setLatestPick(response.latestPick);
      } catch (error) {
        console.error("Failed to fetch latest pick:", error);
      }
      setLoadingFetchPick(false);
    };

    fetchLatestPick();
  }, []);

  const handleAddPick = async () => {
    if (!ticker) {
      return;
    }
    setLoadingAddPick(true);

    try {
      await addStockPick(userId, ticker, shares, buyPrice);
      console.log("Stock pick added successfully");
      // Refresh the latest pick after adding
      const response = await getLatestUserPick(userId);
      setLatestPick(response.latestPick);
    } catch (error) {
      console.error("Failed to add stock pick:", error);
    }
    setLoadingAddPick(false);
  };

  return (
    <View style={styles.container}>
      <Text>Ticker: {ticker}</Text>
      <Button
        disabled={!ticker || !!latestPick || loadingAddPick}
        title={loadingAddPick ? "Submitting..." : "Place Pick"}
        onPress={handleAddPick}
      />
      {!loadingFetchPick && latestPick && (
        <View style={styles.latestPick}>
          <Text>Latest Pick:</Text>
          <Text>Ticker: {latestPick.ticker}</Text>
          <Text>Shares: {latestPick.shares}</Text>
          <Text>Buy Price: {latestPick.buyPrice}</Text>
          {/* Displaying buyTimestamp might require formatting */}
        </View>
      )}
      {loadingFetchPick && <Text>Loading pick...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  latestPick: {
    marginTop: 20,
  },
});
