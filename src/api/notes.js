import axios from "axios";

const getAllNotes = async (id) => {
  const response = await axios
    .get(`https://rodel-dot-services.herokuapp.com/api/notes/getNotes/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const createNote = async (noteObject) => {
  const response = await axios
    .post(
      `https://rodel-dot-services.herokuapp.com/api/notes/createNote`,
      noteObject
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getAllNotes, createNote };
