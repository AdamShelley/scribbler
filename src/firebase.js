import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebase = initializeApp({
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  projectId: process.env.REACT_APP_firebase_projectId,
  appId: process.env.REACT_APP_firebase_appId,
});

const auth = getAuth(firebase);

export { firebase, auth };
