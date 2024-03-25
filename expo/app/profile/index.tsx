import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.componentContainer]}>
        <Link href="/" asChild>
          <Pressable>
            <Text>&#8592; Home</Text>
          </Pressable>
        </Link>
      </View>

      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  componentContainer: {
    width: "90%",
    marginBottom: 20,
  },
});

export default Profile;
