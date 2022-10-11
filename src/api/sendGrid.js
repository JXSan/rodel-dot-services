import axios from "axios";

const sendCurrentlyDueEmails = async () => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/sendgrid/sendCurrentlyDueEmails`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};
const sendPastDueEmails = async () => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/sendgrid/sendPastDueEmails`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};
const sendUCRDueEmails = async () => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/sendgrid/sendUCRDueEmails`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const addUCRContacts = async () => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/sendgrid/addUCRContacts`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const addCurrentlyDueContacts = async () => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/sendgrid/addCurrentlyDueContacts`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const addPastDueContacts = async () => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/sendgrid/addPastDueContacts`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export {
  sendCurrentlyDueEmails,
  sendPastDueEmails,
  sendUCRDueEmails,
  addUCRContacts,
  addCurrentlyDueContacts,
  addPastDueContacts,
};
