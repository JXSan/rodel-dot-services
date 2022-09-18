import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../api/users";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [myUser, setMyUser] = useState();

  const getUserByEmail = async (email) => {
    const response = await getUser(email);
    if (response) setMyUser(response);
  };

  useEffect(() => {
    const currentUser = auth.onAuthStateChanged((authUser) => {
      getUserByEmail(authUser.email);
      setUser(authUser);
    });

    return currentUser;
  }, []);

  // Sign Up
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In
  const login = (email, password) => {
    const user = signInWithEmailAndPassword(auth, email, password);
    if (user) {
      setUser(user);
      return user;
    }
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Update Password
  const updateUserPassword = (user, password) => {
    return updatePassword(user, password);
  };

  // Update Email
  const updateUserEmail = (user, email) => {
    return updateEmail(user, email);
  };

  // Forgot Password
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUserEmail,
        updateUserPassword,
        forgetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
