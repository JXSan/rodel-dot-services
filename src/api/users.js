import axios from "axios";

const getAllUsers = async () => {
  const response = await axios
    .get("https://rodel-dot-services.herokuapp.com/api/users/all")
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const createNewUser = async (userObject) => {
  const response = await axios
    .post(
      "https://rodel-dot-services.herokuapp.com/api/users/createUser",
      userObject
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const updateUser = async (id, userObject) => {
  const response = await axios
    .put(
      `https://rodel-dot-services.herokuapp.com/api/users/updateUser/${id}`,
      userObject
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const deleteUser = async (id) => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/users/deleteUser/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const getUser = async (email) => {
  const response = await axios
    .post(`https://rodel-dot-services.herokuapp.com/api/users/getUser`, {
      email: email,
    })
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getAllUsers, createNewUser, updateUser, deleteUser, getUser };
