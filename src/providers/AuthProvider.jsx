/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider, // Adding FacebookAuthProvider for Facebook login
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";

import app from "../firebase/firebase.init";

import useAxiosPublic from "../hooks/useAxiosPublic";

import Loader from "../components/Loader";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider(); // Initializing FacebookAuthProvider

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Create a new user
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //?  Sign in with Facebook
  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  // Logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // todo: need to update
      // if (currentUser?.email) {
      // const user = { email: currentUser.email };
      // axiosPublic
      // .post("/jwt", user, { withCredentials: true })
      // .then((res) => {
      // console.log("login token", res.data);
      // setLoading(false);
      // });
      // } else {
      // axiosPublic
      // .post("/logout", {}, { withCredentials: true })
      // .then((res) => {
      // console.log("logout data : ", res.data);
      // setLoading(false);
      // });
      // }
      setLoading(false); // Ensure loading stops after auth state resolves
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    signInUser,
    logOut,
    updateUser,
    loading,
    signInWithGoogle,
    signInWithFacebook, // Adding Facebook login to authInfo
    resetPassword,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
