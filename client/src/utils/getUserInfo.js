import axios from "axios";
import API_URL from "../constants/api";

export const getUserInfo = async (id) => {
  const response = await axios.get(`${API_URL}/user/${id}/search`);
  return response.data;
};
