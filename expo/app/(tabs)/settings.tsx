import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <Text>Audio options</Text>
        <Text>Account options</Text>
        <Text>Screen options</Text>
        <Text>Logout</Text>
        <Text>User stats</Text>
        <Text>Legal disclaimers</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
    marginTop: 50,
  },
});

export default Settings;
