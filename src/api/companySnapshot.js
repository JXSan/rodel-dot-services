import axios from "axios";

const getCompanyById = async (id) => {
  const response = await axios
    .get(`http://localhost:8080/api/companysnapshot/id/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getAllCompanies = async () => {
  const response = await axios
    .get("http://localhost:8080/api/companysnapshot/all")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getCurrentCompanies = async () => {
  const response = await axios
    .get("http://localhost:8080/api/companysnapshot/currentlyDue")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getPastDue = async () => {
  const response = await axios
    .get("http://localhost:8080/api/companysnapshot/pastDue")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getCompany = async (dotNumber) => {
  const response = await axios
    .get(`http://localhost:8080/api/companysnapshot/${dotNumber}`)
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
};
