import axios from "axios";
import {
  removeAsyncStorage,
  setAsyncStorage,
} from "../../utils/asyncStorageHelper";
import IP from "../../constants/api";

const API_URL = `${IP}/user`;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    await setAsyncStorage("user", response.data);
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    await setAsyncStorage("user", response.data);
  }
  return response.data;
};

const logout = async () => {
  await removeAsyncStorage("user");
  await removeAsyncStorage("lang");
  await removeAsyncStorage("theme");
};

const update = async (info) => {
  const { userId, token, changes } = info;
  const response = await axios.put(`${API_URL}/update/${userId}`, {
    token,
    changes,
  });
  return response.data;
};

export const authService = { register, login, logout, update };
