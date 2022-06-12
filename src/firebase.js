import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  projectId: process.env.REACT_APP_firebase_projectId,
  appId: process.env.REACT_APP_firebase_appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Init services
export const db = getFirestore();
