import React from "react";
import { View, StyleSheet } from "react-native";
import { StockInfo, StockSearch } from "./src/components";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer, styles.redBorder]}>
        <StockSearch />
      </View>
      <View style={[styles.componentContainer, styles.blueBorder]}>
        <StockInfo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentContainer: {
    width: "90%", // Adjust based on your layout needs
    marginBottom: 20, // Adds space between the components
  },
  redBorder: {
    borderColor: "red",
    borderWidth: 2,
  },
  blueBorder: {
    borderColor: "blue",
    borderWidth: 2,
  },
});

export default App;
