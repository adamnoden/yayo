import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const createUserDocument = functions.auth.user().onCreate((user) => {
  const db = admin.firestore();

  // Define the user document's default content
  const defaultUserData = {
    username: "", // Consider generating a unique username or prompting the user to set it later
    balance: 100000, // Initial balance
    membershipLevel: "Standard",
    // No need to explicitly set empty subcollections (purchases, achievements)
    email: user.email,
  };

  // Create the user document in Firestore
  return db
    .collection("users")
    .doc(user.uid)
    .set(defaultUserData)
    .then(() => console.log(`Document initialized for user ${user.uid}`))
    .catch((error) =>
      console.error(`Error creating document for user ${user.uid}:`, error)
    );
});
