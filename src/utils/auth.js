import React, { useState, useContext, createContext } from "react";
import { Router } from "react-router-dom";
import { firebase, auth } from "../firebase";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
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

  const signinWithGithub = () => {
    setLoading(true);

    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
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
  };
}
