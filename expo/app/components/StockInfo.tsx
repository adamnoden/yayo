import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { callFetchStockPrice } from "../../services/stock-service";

interface Props {
  ticker: string | null;
  quotePrice: number | null;
  setQuotePrice: (price: number | null) => void;
}
export const StockInfo: React.FC<Props> = ({
  ticker,
  quotePrice,
  setQuotePrice,
}) => {
  const [loading, setLoading] = useState(false);

  const handleFetchPrice = async () => {
    setLoading(true);
    try {
      if (!ticker) {
        return;
      }
      const priceInfo = await callFetchStockPrice(ticker);
      setQuotePrice(priceInfo.price);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setQuotePrice(null);
  }, [ticker]);

  return (
    <View>
      {quotePrice && (
        <Text>
          {ticker} quote price: ${quotePrice}
        </Text>
      )}
      <Button
        disabled={loading || !ticker}
        title={loading ? "Loading..." : quotePrice ? "Refresh" : "Get quote"}
        onPress={handleFetchPrice}
      />
    </View>
  );
};
