import "./App.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Backoffice from "./pages/Backoffice";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Sidebar from "./components/Sidebar";
import CompanyDetails from "./pages/CompanyDetails";
import AllCompanies from "./pages/AllCompanies";
import CurrentlyDue from "./pages/CurrentlyDue";
import PastDue from "./pages/PastDue";
import UCR from "./pages/UCR";
import UCRDue from "./pages/UCRDue";
import EmailSettings from "./pages/EmailSettings";
import AllSales from "./pages/AllSales";
import AddCompany from "./pages/AddCompany";
import { Sales } from "./pages/Sales";

const styles = {
  wrapper: "w-screen h-screen",
  leftSideWrapper: "w-64 flex h-full",
  rightSideWrapper: "w-full",
};

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;
const promise = loadStripe(
  "pk_test_51LeNhcBoa9DkGR7IafhBYHihQ87SRbsylWCr7GTcG8MWfUDOVRh73FeBsJowSsVc6NgyrXe5HCnrw48SdMcvssm500H3zPrjAx"
);

function App() {
  // const user = useUser();
  // const isAdmin = user?.user?.unsafeMetadata?.isAdmin;
  const navigate = useNavigate();
  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/backoffice" element={<Backoffice />}>
          <Route path="addcompany" element={<AddCompany />}></Route>
          <Route path="companydetails/:id" element={<CompanyDetails />}></Route>
          <Route path="allcompanies" element={<AllCompanies />}></Route>
          <Route path="currentlyDue" element={<CurrentlyDue />}></Route>
          <Route path="pastDue" element={<PastDue />}></Route>
          <Route path="ucr/:id" element={<UCR />}></Route>
          <Route path="ucrdue" element={<UCRDue />}></Route>
          <Route path="emailsettings" element={<EmailSettings />}></Route>
          <Route path="allsales" element={<AllSales />}></Route>
          <Route path="sales" element={<Sales />}></Route>
        </Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </ClerkProvider>
  );
}

export default App;
