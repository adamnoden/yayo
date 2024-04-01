import { Stack } from "expo-router/stack";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

const AppLayoutInner = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <LoginScreen />
        {/* <SignUpScreen /> */}
      </>
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
