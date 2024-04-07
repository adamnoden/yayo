import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useUserData } from "../context/UserDataContext";

const Bank: React.FC = () => {
  const { balance, email, username, membershipLevel, loading, error } =
    useUserData();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <Text>Balance: ${balance}</Text>
        <Text>Membership level: {membershipLevel}</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
    marginTop: 50,
  },
});

export default Bank;
