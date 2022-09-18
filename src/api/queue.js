import axios from "axios";

const getQueues = async (id) => {
  const response = await axios
    .get(`http://localhost:8081/api/companysnapshot/queues/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

const updateQueueObject = async (id, queueObject) => {
  const response = await axios
    .put(
      `http://localhost:8081/api/companysnapshot/updateQueue/${id}`,
      queueObject
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) return response.data;
};

export { getQueues, updateQueueObject };
