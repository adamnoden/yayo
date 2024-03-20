import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import {
  Pick,
  addStockPick,
  callFetchStockPrice,
  getLatestUserPick,
  sellStockPick,
} from "../services/stock-service";
import { MOCK_USER_ID } from "../constants";

interface Props {
  ticker: string | null;
  quotePrice: number | null;
  onTradeEvent: () => void;
}
export const BidPlacer: React.FC<Props> = ({
  ticker,
  quotePrice,
  onTradeEvent,
}) => {
  const [latestPick, setLatestPick] = useState<Pick | undefined>();
  const [latestPickId, setLatestPickId] = useState<string | undefined>();

  const [loadingAddPick, setLoadingAddPick] = useState(false);
  const [loadingSellPick, setLoadingSellPick] = useState(false);
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
        const response = await getLatestUserPick(MOCK_USER_ID);
        setLatestPick(response.latestPick);
        setLatestPickId(response.pickId);
      } catch (error) {
        console.error("Failed to fetch latest pick:", error);
      }
      setLoadingFetchPick(false);
    };

    fetchLatestPick();
  }, []);

  useEffect(() => {
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
    console.log("Buying", ticker, quotePrice);
    if (!ticker || !quotePrice) {
      console.error("Missing something", ticker, quotePrice);
      return;
    }
    setLoadingAddPick(true);

    const shares = 1; // TODO: calculate from input

    try {
      await addStockPick(MOCK_USER_ID, ticker, shares, quotePrice);
      const response = await getLatestUserPick(MOCK_USER_ID);
      setLatestPick(response.latestPick);
      setLatestPickId(response.pickId);
    } catch (error) {
      console.error("Failed to add stock pick:", error);
    } finally {
      setLoadingAddPick(false);
      onTradeEvent();
    }
  };

  const handleSell = async () => {
    if (!latestPick || !currentStockPrice || !latestPickId) {
      Alert.alert("Was missing data so couldn't sell");
      return;
    }
    setLoadingSellPick(true);
    try {
      await sellStockPick(latestPickId, MOCK_USER_ID, currentStockPrice);

      const response = await getLatestUserPick(MOCK_USER_ID);
      setLatestPick(response.latestPick);
      setLatestPickId(response.pickId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSellPick(false);
      onTradeEvent();
    }
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
        title={loadingAddPick ? "Submitting..." : "Buy"}
        onPress={handleAddPick}
      />
      <Button
        disabled={
          !ticker || !latestPick || loadingSellPick || latestPick.isSold
        }
        title={loadingSellPick ? "Selling..." : "Sell"}
        onPress={handleSell}
      />
      {!loadingFetchPick && latestPick && (
        <View style={styles.latestPick}>
          <Text>Latest Pick:</Text>
          <Text>Sold: {latestPick.isSold ? "yes" : "no"}</Text>
          <Text>Ticker: {latestPick.ticker}</Text>
          <Text>Shares: {latestPick.shares}</Text>
          <Text>Buy Price: ${latestPick.buyPrice}</Text>
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
                {gainLossPercentage < 0 && "-"}
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
