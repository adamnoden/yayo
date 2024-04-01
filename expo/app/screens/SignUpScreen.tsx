import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const auth = getAuth();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        sendEmailVerification(user)
          .then(() => {
            console.log("send verification success");
          })
          .catch((error) => {
            // Handle errors from sendEmailVerification
            console.error("Verification email send error:", error);
          });

        Alert.alert(
          "Sign Up Successful - we've sent you a verification email",
          `Welcome, ${user.email}`
        );
        // Navigate to main app screen or dashboard
      })
      .catch((error) => {
        let userFriendlyMessage = "Sign up failed. Please try again.";
        switch (error.code) {
          case "auth/email-already-in-use":
            userFriendlyMessage = "This email is already in use.";
            break;
          case "auth/weak-password":
            userFriendlyMessage =
              "Password is too weak. Please use minimum of 6 characters";
            break;
          // Add more cases as needed
        }
        Alert.alert("Sign Up Failed", userFriendlyMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});
