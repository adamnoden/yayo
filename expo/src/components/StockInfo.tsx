import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { callFetchStockPrice } from "../services/stock-service";

interface Props {
  ticker: string | null;
}
export const StockInfo: React.FC<Props> = ({ ticker }) => {
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchPrice = async () => {
    setLoading(true);
    try {
      if (!ticker) {
        return;
      }
      const priceInfo = await callFetchStockPrice(ticker);
      setStockPrice(priceInfo.price);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStockPrice(null);
  }, [ticker]);

  return (
    <View>
      <Text>
        {ticker} stock Price: {stockPrice}
      </Text>
      <Button
        disabled={loading}
        title={loading ? "Loading..." : "Refresh"}
        onPress={handleFetchPrice}
      />
    </View>
  );
};
