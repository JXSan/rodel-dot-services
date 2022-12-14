import React from "react";
import Sidebar from "../components/Sidebar";
import { Sales } from "./Sales";
import Search from "./Search";
import { Routes, Route } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import AllCompanies from "./AllCompanies";
import CurrentlyDue from "./CurrentlyDue";
import PastDue from "./PastDue";
import UCR from "./UCR";
import UCRDue from "./UCRDue";
import AllSales from "./AllSales";
import { useUser } from "@clerk/clerk-react";
import AddCompany from "./AddCompany";
import EmailSettings from "./EmailSettings";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe(
  "pk_test_51LeNhcBoa9DkGR7IafhBYHihQ87SRbsylWCr7GTcG8MWfUDOVRh73FeBsJowSsVc6NgyrXe5HCnrw48SdMcvssm500H3zPrjAx"
);

const Backoffice = () => {
  const user = useUser();
  const isAdmin = user?.user?.unsafeMetadata?.isAdmin;
  if (user?.user?.unsafeMetadata.status === "active") {
    return (
      <>
        <SignedIn>
          <Elements stripe={promise}>
            <div className="flex w-full">
              <div className="h-screen w-screen flex">
                <div className="flex h-full max-h-full">
                  <Sidebar />
                </div>
                <div className="w-full h-full items-center justify-center flex flex-col bg-slate-50">
                  <Routes>
                    <Route path="/" element={<Search />}></Route>
                    <Route path="/sales" element={<Sales />}></Route>
                    <Route
                      path="/companydetails/:id"
                      element={<CompanyDetails />}
                    ></Route>
                    <Route
                      path="/allcompanies"
                      element={<AllCompanies />}
                    ></Route>
                    <Route
                      path="/currentlyDue"
                      element={<CurrentlyDue />}
                    ></Route>
                    <Route path="/pastDue" element={<PastDue />}></Route>
                    <Route path="/ucr/:id" element={<UCR />}></Route>
                    <Route path="/ucrdue" element={<UCRDue />}></Route>
                    <Route
                      path="/emailsettings"
                      element={<EmailSettings />}
                    ></Route>
                    {isAdmin && (
                      <Route path="/allsales" element={<AllSales />}></Route>
                    )}
                    {isAdmin && (
                      <Route
                        path="/addcompany"
                        element={<AddCompany />}
                      ></Route>
                    )}
                  </Routes>
                </div>
              </div>
            </div>
          </Elements>
        </SignedIn>
        <SignedOut>
          <div className="h-screen w-screen flex justify-center items-center">
            <SignIn />
          </div>
        </SignedOut>
      </>
    );
  } else {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <SignIn />
      </div>
    );
  }
};

export default Backoffice;
