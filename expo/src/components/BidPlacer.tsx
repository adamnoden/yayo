import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  Pick,
  addStockPick,
  callFetchStockPrice,
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
  const [loadingFetchPickPrice, setLoadingFetchPickPrice] = useState(false);
  const [currentStockPrice, setCurrentStockPrice] = useState<number | null>(
    null
  );

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

  useEffect(() => {
    console.log("in use effect", latestPick);
    if (!latestPick) {
      return;
    }
    setLoadingFetchPickPrice(true);

    // Fetch the latest price when a pick is retrieved
    const fetchPickPrice = async () => {
      if (latestPick.ticker) {
        try {
          const res = await callFetchStockPrice(latestPick.ticker);
          console.log(res);
          setCurrentStockPrice(res.price);
        } catch (error) {
          console.error("Failed to fetch price of pick:", error);
        }
      }
      setLoadingFetchPickPrice(false);
    };

    fetchPickPrice();
  }, [latestPick]);

  const handleAddPick = async () => {
    if (!ticker) {
      return;
    }
    setLoadingAddPick(true);

    try {
      await addStockPick(userId, ticker, shares, buyPrice);
      const response = await getLatestUserPick(userId);
      setLatestPick(response.latestPick);
    } catch (error) {
      console.error("Failed to add stock pick:", error);
    }
    setLoadingAddPick(false);
  };

  // Calculate the price of user's current holdings and the percentage gain/loss
  const holdingsValue = latestPick
    ? latestPick.shares * (currentStockPrice || 0)
    : 0;
  const gainLossPercentage =
    latestPick && currentStockPrice
      ? ((currentStockPrice - latestPick.buyPrice) / latestPick.buyPrice) * 100
      : 0;

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

          <Text>
            Current Price:{" "}
            {loadingFetchPickPrice
              ? "Loading..."
              : `$${currentStockPrice?.toFixed(2)}`}{" "}
          </Text>
          <Text>
            Holdings Value:{" "}
            {loadingFetchPickPrice
              ? "Loading..."
              : `$${holdingsValue.toFixed(2)}`}
          </Text>
          <Text>
            {gainLossPercentage >= 0 ? "Gain" : "Loss"}:
            {loadingFetchPickPrice ? (
              "Loading..."
            ) : (
              <Text
                style={
                  gainLossPercentage >= 0 ? styles.positive : styles.negative
                }
              >
                {gainLossPercentage < 0 && "-"}$
                {Math.abs(gainLossPercentage).toFixed(2)}%
              </Text>
            )}
          </Text>
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
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});
