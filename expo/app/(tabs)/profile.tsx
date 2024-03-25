import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <Text>Todo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
    marginTop: 50,
  },
});

export default Profile;
