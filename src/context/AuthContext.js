import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createFireBaseUser = (email, password) => {
    const user = createUserWithEmailAndPassword(auth, email, password);
    if (user) setUser(user);
  };

  const logout = () => {
    setUser();
    return signOut(auth);
  };

  const signIn = async (email, password) => {
    const user = signInWithEmailAndPassword(auth, email, password);
    if (user) setUser(user);
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // }, []);

  return (
    <UserContext.Provider value={{ createFireBaseUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
