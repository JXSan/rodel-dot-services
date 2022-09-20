import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios"

const PaymentForm = () => {
  const [success, setSuccess] = useState(false)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
  }

  if (!error)
  {
    try {
      const { id } = paymentMethod
      const response = await axios.post("https://rodel-dot-services.herokuapp.com/api/stripe/payments",
        amount: 1000,
      id
      )
    } catch (err) {
      console.log(err)
    }
    }
  return <div>PaymentForm</div>;
};

export default PaymentForm;
