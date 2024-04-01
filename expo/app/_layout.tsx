import { Stack } from "expo-router/stack";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { View, StyleSheet } from "react-native";

const AppLayoutInner = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <SignUpScreen />
        <LoginScreen />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
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
});
