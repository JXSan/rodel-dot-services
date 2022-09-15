import axios from "axios";

const getAllPendingSales = async () => {
  const response = await axios
    .get("http://localhost:8081/api/sales/pendingSales")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const getAllSales = async () => {
  const response = await axios
    .get("http://localhost:8081/api/sales/allSales")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const getAllUserSales = async (uid) => {
  const response = await axios
    .get(`http://localhost:8081/api/sales/userSales/${uid}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const createSale = async (saleObject) => {
  const response = await axios
    .post("http://localhost:8081/api/sales/createSale", saleObject)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const updateSaleStatusById = async (id, status) => {
  const response = await axios
    .put(`http://localhost:8081/api/sales/updateSale/${id}`, status)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const removeSale = async (id) => {
  const response = await axios
    .get(`http://localhost:8081/api/sales/deleteSale/${id}`)
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
