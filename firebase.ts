import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Safe access to environment variables to prevent runtime crashes if import.meta.env is undefined
const env = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase with explicit types
let app: FirebaseApp | undefined;
let dbInstance: Firestore | undefined;

try {
  // Check if config is present (apiKey is a good proxy)
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase configuration is missing or import.meta.env is undefined. The app will load but database features will not work.");
  }
  // We attempt initialization anyway; if config is empty, it might throw, so we catch it.
  app = initializeApp(firebaseConfig);
  dbInstance = getFirestore(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Export db safely
export const db = dbInstance!;
