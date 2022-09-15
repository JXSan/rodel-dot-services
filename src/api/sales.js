import axios from "axios";

const getAllPendingSales = async () => {
  const response = await axios
    .get("https://rodel-dot-services.herokuapp.com/api/sales/pendingSales")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const getAllSales = async () => {
  const response = await axios
    .get("https://rodel-dot-services.herokuapp.com/api/sales/allSales")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const getAllUserSales = async (uid) => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/sales/userSales/${uid}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const createSale = async (saleObject) => {
  const response = await axios
    .post(
      "https://rodel-dot-services.herokuapp.com/api/sales/createSale",
      saleObject
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const updateSaleStatusById = async (id, status) => {
  const response = await axios
    .put(
      `https://rodel-dot-services.herokuapp.com/api/sales/updateSale/${id}`,
      status
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const removeSale = async (id) => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/sales/deleteSale/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export {
  getAllPendingSales,
  getAllSales,
  getAllUserSales,
  createSale,
  updateSaleStatusById,
  removeSale,
};
