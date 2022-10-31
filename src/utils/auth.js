import React, { useEffect, useState, useContext, createContext } from "react";
import { actionCodeSettings } from "../utils/actionCodeSettings";

import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import { createUser } from "./db";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    // Get saved email
    const saved_email = window.localStorage.getItem("emailForSignIn");

    if (isSignInWithEmailLink(auth, window.location.href) && !!saved_email) {
      signInWithEmailLink(auth, saved_email, window.location.href);
    }
  }, []);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setUser(user);
      createUser(user.uid, user);
    } else {
      setUser(false);
      return false;
    }
  };

  const checkSignedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleUser(user);
      }
    });
  };

  const signinWithGithub = () => {
    setLoading(true);

    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        handleUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithEmailLinkHandler = async (email) => {
    if (!email) return;

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      });
    } catch (error) {
      console.log(error);
    }
    window.localStorage.setItem("emailForSignIn", email);
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        setUser(false);
        sessionStorage.removeItem("scribbles");
        sessionStorage.removeItem("archived");
        sessionStorage.removeItem("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    user,
    loading,
    signinWithGithub,
    signInWithEmailLinkHandler,
    signout,
    checkSignedIn,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
