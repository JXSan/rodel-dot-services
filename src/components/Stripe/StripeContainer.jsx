import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LRr4ICTs4LHmWdKetBblV6Tj1fGjN7v6gzO12NdoFqdqF2mx8ALhe9johK9aa3Qj0NUh0ZEFnNSd8Y0lgAweM0h00JfpbZ56h";

const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
