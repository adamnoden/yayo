import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useUserData } from "../context/UserDataContext";

const Profile = () => {
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
      <Text style={styles.title}>User Profile</Text>
      <View>
        <Text>Email: {email}</Text>
        <Text>Username: {username}</Text>
        <Text>Membership Level: {membershipLevel}</Text>
        <Text>Balance: ${balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Profile;
