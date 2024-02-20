import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { useState } from "react";

export default function App() {
  const [quote, setQuote] = useState<string | undefined>();

  const getQuote = () => {
    setQuote("$413.43");
  };
  return (
    <View style={styles.container}>
      <Text>AAPL:{quote ? quote : "Tap button to fetch latest"} </Text>
      <Button onPress={getQuote} title="Update Quote" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
