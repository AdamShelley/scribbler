import React, { useState, useContext, createContext, useCallback } from "react";
import { Router } from "react-router-dom";
import { firebase, auth } from "../firebase";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
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

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);
    } else {
      setUser(false);
      return false;
    }
  };

  const checkSignedIn = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleUser(user);
      }
    });
  }, [auth]);

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

  const signout = () => {
    signOut(auth)
      .then(() => {
        setUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    user,
    loading,
    signinWithGithub,
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
