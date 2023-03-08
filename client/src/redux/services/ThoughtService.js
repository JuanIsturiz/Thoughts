import axios from "axios";

const API_URL = "http://192.168.0.135:5000/thought";

const getAllThoughts = async () => {
  const response = await axios(API_URL);
  return response.data;
};

const createThought = async (info) => {
  const { text, emotion, userId, token } = info;

  const config = {
    headers: {
      authentication: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}`,
    { text, emotion, userId },
    config
  );

  return response.data;
};

export const thoughtService = { getAllThoughts, createThought };
