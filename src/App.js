import "./App.css";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Search from "./pages/Search";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllCompanies from "./pages/AllCompanies";
import CurrentlyDue from "./pages/CurrentlyDue";
import CompanyDetails from "./pages/CompanyDetails";
import PastDue from "./pages/PastDue";
import { Sales } from "./pages/Sales";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateProvider";
import Users from "./pages/Users";
import { auth } from "./config/firebase";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
  SignIn,
  UserProfile,
  SignOutButton,
} from "@clerk/clerk-react";
import Backoffice from "./pages/Backoffice";

const styles = {
  wrapper: "w-screen h-screen",
  leftSideWrapper: "w-64 flex h-full",
  rightSideWrapper: "w-full",
};

const promise = loadStripe(
  "pk_test_51LRr4ICTs4LHmWdKetBblV6Tj1fGjN7v6gzO12NdoFqdqF2mx8ALhe9johK9aa3Qj0NUh0ZEFnNSd8Y0lgAweM0h00JfpbZ56h"
);

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <SignedIn>
        <Elements stripe={promise}>
          <div className="flex w-full">
            <Backoffice />
          </div>
        </Elements>
      </SignedIn>
      <SignedOut>
        <div className="h-screen w-screen flex justify-center items-center">
          <SignIn />
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
