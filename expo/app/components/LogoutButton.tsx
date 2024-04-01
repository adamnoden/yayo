import React from "react";
import { Button } from "react-native";
import { useAuth } from "../context/AuthContext";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  return <Button onPress={() => signOut()} title="Logout" />;
};
