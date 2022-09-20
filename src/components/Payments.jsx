import React, { useState } from "react";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Payments = () => {
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleInput = async (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8081/api/stripe/payment",
          {
            amount: 149 * 100,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-red-300 h-full">
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement />
        </form>
      </div>
      <div></div>
      {/* {!success ? (
        <form className="form-control" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-400">Full Name</label>
            <hr />
            <input
              placeholder="John Doe"
              className="mt-2 border border-gray-400 rounded-lg drop-shadow-sm p-1"
              type="text"
              value={fullName}
              onChange={handleInput}
            />
            <label className="mt-6 text-gray-400">Email</label>
            <hr />
            <input
              placeholder="JohnDoe@gmail.com"
              className="mt-2 border border-gray-400 rounded-lg drop-shadow-sm p-1"
              type="email"
              value={email}
              onChange={handleInput}
            />
            <CardElement />
          </div>

          <div className="mt-6">
            <button type="submit" className="btn">
              Pay
            </button>
          </div>
        </form>
      ) : (
        <p></p>
      )} */}
    </div>
  );
};

export default Payments;
