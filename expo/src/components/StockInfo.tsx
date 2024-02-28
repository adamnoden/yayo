// Example component file: src/components/StockInfoComponent.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { callFetchStockPrice } from "../services/stockService";

export const StockInfoComponent = () => {
  const [stockPrice, setStockPrice] = useState<number | null>(null);

  const handleFetchPrice = async () => {
    try {
      const priceInfo = await callFetchStockPrice("AAPL");
      setStockPrice(priceInfo.price); // Adjust based on the actual response structure
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>NVDA stock Price: {stockPrice}</Text>
      <Button title="Refresh Price" onPress={handleFetchPrice} />
    </View>
  );
};
