import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmj11YvW13QOYZeJYK6pGFoq8pwHJzdkQ",
  authDomain: "rodel-dotservicesdevelopment.firebaseapp.com",
  projectId: "rodel-dotservicesdevelopment",
  storageBucket: "rodel-dotservicesdevelopment.appspot.com",
  messagingSenderId: "148229549894",
  appId: "1:148229549894:web:207e2b922b3c2c4bf6bf47",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
