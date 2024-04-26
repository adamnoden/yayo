import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MarketStatusComponent } from "../components/MarketStatus";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <Text>Welcome to YAYO</Text>
      </View>
      <View style={[styles.componentContainer]}>
        <MarketStatusComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
  },
});

export default App;
