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

const getThoughtsByEmotion = async (info) => {
  const { multiple, emotion } = info;

  const url = `${API_URL}/search/emotion?multiple=${multiple}&emotion=`;
  let query = "";

  if (multiple) {
    emotion.forEach((emotion, idx) => {
      if (idx === 0) {
        query += emotion;
        return;
      }
      query += `&emotion=${emotion}`;
    });
  } else {
    query = emotion;
  }

  const response = await axios(url + query);
  return response.data;
};

const getThoughtsByUsername = async (username) => {
  const url = `${API_URL}/search/username?username=${username}`;
  const response = await axios(url);
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

const likeThought = async (info) => {
  const { id, userId, action } = info;
  const response = await axios.put(`${API_URL}/${id}`, { userId, action });
  return response.data;
};

export const thoughtService = {
  getAllThoughts,
  getThoughtsByUser,
  getThoughtsByEmotion,
  getThoughtsByUsername,
  createThought,
  deleteThought,
  likeThought,
};
