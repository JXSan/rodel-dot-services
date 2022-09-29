import axios from "axios";

const createCompanyByUsdot = async (usdot) => {
  const response = await axios
    .post(
      `https://rodel-dot-services.herokuapp.com/api/companysnapshot/createCompanyByUsdot`,
      {
        usdot: usdot,
      }
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getCompanyById = async (id) => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/companysnapshot/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const updateAllCurrentlyDueCompanies = async () => {
  const response = await axios
    .get(
      "https://rodel-dot-services.herokuapp.com/api/companysnapshot/fetchAndChangeCurrentlyDue"
    )
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

const getUCRDue = async () => {
  const response = await axios
    .get("https://rodel-dot-services.herokuapp.com/api/companysnapshot/ucrdue")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const blacklistCompany = async (usdot, status) => {
  const response = await axios
    .put(
      `https://rodel-dot-services.herokuapp.com/api/companysnapshot/blacklist/${usdot}`,
      {
        status: status,
      }
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

const getLatestFromSafer = async (id) => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/companysnapshot/fetchLatest/${id}`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data.results;
};

export {
  getAllCompanies,
  getCurrentCompanies,
  getPastDue,
  getUCRDue,
  getCompany,
  getCompanyById,
  blacklistCompany,
  getLatestFromSafer,
  updateAllCurrentlyDueCompanies,
  createCompanyByUsdot,
};
