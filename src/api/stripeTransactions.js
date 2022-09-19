import axios from "axios";

const getAllStripeTransactions = async () => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/stripe/allPayments`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const createCharge = async (user, productId, companyId, serviceType) => {
  const response = await axios
    .post("http://localhost:8081/api/stripe/payment", {
      productId: productId,
      user: user.user,
      company: companyId,
      serviceType: serviceType,
    })
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getAllStripeTransactions, createCharge };
