import axios from "axios";

const getCompanyById = async (id) => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/companysnapshot/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getAllCompanies = async () => {
  const response = await axios
    .get("https://rodel-dot-services.herokuapp.com/api/companysnapshot/all")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getCurrentCompanies = async () => {
  const response = await axios
    .get(
      "https://rodel-dot-services.herokuapp.com/api/companysnapshot/currentlyDue"
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getPastDue = async () => {
  const response = await axios
    .get("https://rodel-dot-services.herokuapp.com/api/companysnapshot/pastDue")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getCompany = async (dotNumber) => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/companysnapshot/${dotNumber}`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getUCRDue = async () => {};

export {
  getAllCompanies,
  getCurrentCompanies,
  getPastDue,
  getUCRDue,
  getCompany,
  getCompanyById,
};
