import axios from "axios";

const getAllStripeTransactions = async () => {
  const response = await axios
    .get(`http://localhost:8080/api/stripe/allPayments`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getAllStripeTransactions };
