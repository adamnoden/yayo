import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LogoutButton } from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <Text>Audio options</Text>
        <Text>Account options</Text>
        <Text>Screen options</Text>
        <Text>User stats</Text>
        <Text>Legal disclaimers</Text>

        <Text>Email: {user?.email}</Text>
        <Text>Email verified: {user?.emailVerified ? "yes" : "no"}</Text>
        <LogoutButton />
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
