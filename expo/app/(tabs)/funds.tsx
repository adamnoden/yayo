import React from "react";
import { View, StyleSheet, Text } from "react-native";

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
