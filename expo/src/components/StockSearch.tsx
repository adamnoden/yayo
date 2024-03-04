import React, { useState } from "react";
import { View, TextInput, Button, Text, FlatList } from "react-native";

interface ParsedResult {
  ticker: string;
  name: string;
  exchange: string;
  id: string;
}

export const StockSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ParsedResult[]>([]);

  const searchStock = () => {
    // Placeholder for API call logic
    // After fetching, parse and set results with setResults
    console.log(`Searching for: ${query}`);
    // Mock result
    setResults([
      { ticker: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", id: "1" },
      // Add more mock results here
    ]);
  };

  return (
    <View>
      <TextInput
        placeholder="Type a stock symbol..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchStock} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{`${item.ticker} - ${item.name} (${item.exchange})`}</Text>
        )}
      />
    </View>
  );
};
