import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LeNhcBoa9DkGR7IafhBYHihQ87SRbsylWCr7GTcG8MWfUDOVRh73FeBsJowSsVc6NgyrXe5HCnrw48SdMcvssm500H3zPrjAx";

const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
