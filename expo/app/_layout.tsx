import { Stack } from "expo-router/stack";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { View, StyleSheet, Text } from "react-native";
import { UserDataProvider } from "./context/UserDataContext";

const AppLayoutInner = () => {
  const { user, loading } = useAuth();

  if (!user && loading) {
    return (
      <View style={styles.container}>
        <Text>Loading user details...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <SignUpScreen />
        <LoginScreen />
      </View>
    );
  }

  return (
    <UserDataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserDataProvider>
  );
};
export default function AppLayout() {
  return (
    <AuthProvider>
      <AppLayoutInner />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // TODO: fix this styling
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    width: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
