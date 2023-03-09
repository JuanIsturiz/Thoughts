import axios from "axios";
import IP from "../../constants/api";

const API_URL = `${IP}/thought`;

const getAllThoughts = async () => {
  const response = await axios(API_URL);
  return response.data;
};

const getThoughtsByUser = async (userId) => {
  const response = await axios(`${API_URL}/user/${userId}`);
  return response.data;
};

const createThought = async (info) => {
  const { text, emotion, userId, username, token } = info;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL,
    { text, emotion, userId, username },
    config
  );

  return response.data;
};

const deleteThought = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const thoughtService = {
  getAllThoughts,
  getThoughtsByUser,
  createThought,
  deleteThought,
};
