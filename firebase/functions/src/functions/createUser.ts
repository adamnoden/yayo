import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { MembershipLevel, UserData } from "../../../../types";

export const createUserDocument = functions.auth.user().onCreate((user) => {
  const db = admin.firestore();

  // Define the user document's default content
  const defaultUserData: any = {
    username: "", // will get the user to update this later in the flow
    balance: 1_000_00, // Initial balance of a grand
    membershipLevel: "Standard", // MembershipLevel.Standard,
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
