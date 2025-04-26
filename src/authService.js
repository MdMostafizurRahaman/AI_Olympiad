import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error("User not found. Please check your credentials or sign up.");
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google User:', user);
    return user; // Return the user object from Google authentication
  } catch (error) {
    console.error("Error with Google Sign In:", error);
    throw new Error("Google sign-in failed. Please try again.");
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// Firebase Firestore instance
export const db = getFirestore(app);

// Export Firebase auth for use in other parts of the app
export { auth };
