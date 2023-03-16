import axios from "axios";
import IP from "../../constants/api";

const API_URL = `${IP}/thought`;

const getAllThoughts = async (page) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};

const getThoughtsByUser = async (info) => {
  const { userId, page } = info;
  const response = await axios.get(`${API_URL}/user/${userId}?page=${page}`);
  return response.data;
};

const getLikedThoughts = async (info) => {
  const { userId, page } = info;
  const response = await axios.get(
    `${API_URL}/user/${userId}/liked?page=${page}`
  );
  return response.data;
};

const getThoughtsByEmotion = async (info) => {
  const { multiple, emotion, page } = info;

  const url = `${API_URL}/search/emotion?page=${page}&multiple=${multiple}&emotion=`;
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

  const response = await axios.get(url + query);
  return response.data;
};

const getThoughtsByUsername = async (info) => {
  const { username, page } = info;
  const url = `${API_URL}/search/username?page=${page}&username=${username}`;
  const response = await axios.get(url);
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
  getLikedThoughts,
  getThoughtsByEmotion,
  getThoughtsByUsername,
  createThought,
  deleteThought,
  likeThought,
};
