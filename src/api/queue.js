import axios from "axios";

const getQueues = async (id) => {
  const response = await axios
    .get(
      `https://rodel-dot-services.herokuapp.com/api/companysnapshot/queues/${id}`
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const updateQueueObject = async (id, queueObject) => {
  const response = await axios
    .put(
      `https://rodel-dot-services.herokuapp.com/api/companysnapshot/updateQueue/${id}`,
      queueObject
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getQueues, updateQueueObject };
