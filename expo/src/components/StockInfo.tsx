import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { callFetchStockPrice } from "../services/stock-service";

export const StockInfo = () => {
  const [stockPrice, setStockPrice] = useState<number | null>(null);

  const handleFetchPrice = async () => {
    try {
      const priceInfo = await callFetchStockPrice("NVDA");
      setStockPrice(priceInfo.price);
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
