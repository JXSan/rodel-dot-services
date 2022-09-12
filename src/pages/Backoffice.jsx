import React from "react";
import Sidebar from "../components/Sidebar";
import Users from "./Users";
import { Sales } from "./Sales";
import Search from "./Search";
import { Routes, Route } from "react-router-dom";
import Success from "./Success";
import CompanyDetails from "./CompanyDetails";

const Backoffice = () => {
  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar */}
      <div className="w-80 flex h-full max-h-full bg-red-600">
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
        </Routes>
      </div>
      {/* Routes */}
    </div>
  );
};

export default Backoffice;
