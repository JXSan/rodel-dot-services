import axios from "axios";

const getAllStripeTransactions = async () => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/stripe/allPayments`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getAllStripeTransactions };
