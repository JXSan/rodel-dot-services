import "./App.css";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Backoffice from "./pages/Backoffice";

const styles = {
  wrapper: "w-screen h-screen",
  leftSideWrapper: "w-64 flex h-full",
  rightSideWrapper: "w-full",
};

const promise = loadStripe(
  "pk_test_51LeNhcBoa9DkGR7IafhBYHihQ87SRbsylWCr7GTcG8MWfUDOVRh73FeBsJowSsVc6NgyrXe5HCnrw48SdMcvssm500H3zPrjAx"
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
