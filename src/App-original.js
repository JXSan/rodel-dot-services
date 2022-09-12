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
import { Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateProvider";
import Users from "./pages/Users";
import { auth } from "./config/firebase";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext-test";
import { ClerkProvider } from "@clerk/clerk-react";

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
      <AuthProvider>
        <div className="w-screen h-screen flex">
          <div className="w-80 flex h-full max-h-full bg-red-600">
            <Sidebar />
          </div>
          <div className="w-full h-full items-center justify-center flex flex-col bg-slate-50">
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/currentlyDue"
                element={
                  <ProtectedRoute>
                    <CurrentlyDue />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/pastDue"
                element={
                  <ProtectedRoute>
                    <PastDue />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/sales"
                element={
                  <ProtectedRoute>
                    <Sales />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/allcompanies"
                element={
                  <ProtectedRoute>
                    <AllCompanies />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/companydetails/:id"
                element={
                  <ProtectedRoute>
                    <CompanyDetails />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="*" element={<h1>Page Not Found</h1>}></Route>
              {/* <Route path="/" element={<Search />}></Route> */}
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
