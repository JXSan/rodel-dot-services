import React from "react";
import Sidebar from "../components/Sidebar";
import Users from "./Users";
import { Sales } from "./Sales";
import Search from "./Search";
import { Routes, Route } from "react-router-dom";
import Success from "./Success";
import CompanyDetails from "./CompanyDetails";
import Dashboard from "./Dashboard";
import AllCompanies from "./AllCompanies";
import CurrentlyDue from "./CurrentlyDue";
import PastDue from "./PastDue";
import UCR from "./UCR";
import UCRDue from "./UCRDue";
import AllSales from "./AllSales";
import { useUser } from "@clerk/clerk-react";

const Backoffice = () => {
  const user = useUser();
  const isAdmin = user.user?.unsafeMetadata?.isAdmin;
  if (user.user.unsafeMetadata.status === "active") {
    return (
      <div className="h-screen w-screen flex">
        <div className="flex h-full max-h-full">
          <Sidebar />
        </div>
        <div className="w-full h-full items-center justify-center flex flex-col bg-slate-50">
          <Routes>
            <Route path="/" element={<Search />}></Route>
            <Route
              path="/companydetails/:id"
              element={<CompanyDetails />}
            ></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/sales" element={<Sales />}></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/allcompanies" element={<AllCompanies />}></Route>
            <Route path="/currentlyDue" element={<CurrentlyDue />}></Route>
            <Route path="/pastDue" element={<PastDue />}></Route>
            <Route path="/ucr/:id" element={<UCR />}></Route>
            <Route path="/ucrdue" element={<UCRDue />}></Route>
            {isAdmin && <Route path="/allsales" element={<AllSales />}></Route>}
          </Routes>
        </div>
        {/* Routes */}
      </div>
    );
  }
};

export default Backoffice;
