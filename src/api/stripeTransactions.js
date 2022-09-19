import axios from "axios";

const getAllStripeTransactions = async () => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/stripe/allPayments`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const createCharge = async (
  user,
  productId,
  companyId,
  serviceType,
  ucrFormData
) => {
  const response = await axios
    .post("https://rodel-dot-services.herokuapp.com/api/stripe/payment", {
      productId: productId,
      user: user.user,
      company: companyId,
      serviceType: serviceType,
      ucrFormData: ucrFormData,
    })
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getAllStripeTransactions, createCharge };
