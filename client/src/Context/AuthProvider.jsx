import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { getUserInfo } from "../utilities/getUserInfo";

export const AuthContext = createContext();
const auth = getAuth();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfoFromDb, setUserInfoFromDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();

  //Registration part done
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password, userInfo) => {
    setUserInfoFromDb(userInfo);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //Sign in part
  const signIn = (email, password, userInfo) => {
    setLoading(true);
    setUserInfoFromDb(userInfo);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    // setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      //();('inside auth state change', currentUser);

      if (currentUser === null || currentUser?.uid) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    signInWithGoogle,
    createUser,
    logOut,
    updateUserProfile,
    signIn,
    user,
    userInfoFromDb,
    setLoading,
    loading,
    error,
    setError,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
