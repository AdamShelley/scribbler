import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  projectId: process.env.REACT_APP_firebase_projectId,
  appId: process.env.REACT_APP_firebase_appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Init services
const db = getFirestore();

export { db };

// const provider = new GithubAuthProvider();

// const auth = getAuth();

// signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const token = credential.token;

//     const user = result.user;
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// export { db, provider, signInWithPopup };
