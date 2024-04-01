import { initializeApp } from "firebase/app";
import { Platform } from "react-native";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  connectAuthEmulator,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1Dr0ipK3KNbFIH5yHhC6rfZKQaRWCvC8",
  authDomain: "yayo-backend.firebaseapp.com",
  databaseURL: "https://yayo-backend-default-rtdb.firebaseio.com",
  projectId: "yayo-backend",
  storageBucket: "yayo-backend.appspot.com",
  messagingSenderId: "252945716938",
  appId: "1:252945716938:web:f51595752439c0da514633",
  measurementId: "G-41E87W2LXL",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Connect to Firebase Emulators in development (NOTE: WONT WORK FROM IPHONE)
if (__DEV__) {
  if (Platform.OS === "web") {
    connectFirestoreEmulator(db, "localhost", 8080); // Firestore emulator
    connectAuthEmulator(auth, "http://localhost:9099"); // Auth emulator, note the http protocol
    connectFunctionsEmulator(functions, "localhost", 5001); // Functions emulator
  } else {
    // For iOS, if testing on a device, replace 'localhost' with your machine's local network IP address
    // TODO: try this out here
  }
}

export { db, functions, auth };
