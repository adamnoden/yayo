import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useUserData } from "../context/UserDataContext";

const UserBalance: React.FC = () => {
  const { balance, loading, refreshUserData, error } = useUserData();

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
      <Text style={styles.balanceText}>
        {loading ? "Loading..." : `Balance: $${balance}`}
      </Text>
      <Button
        title="Refresh Balance"
        onPress={refreshUserData}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  balanceText: {
    // fontSize: 20,
    // marginBottom: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserBalance;
