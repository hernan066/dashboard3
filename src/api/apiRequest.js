/* eslint-disable no-param-reassign */
import axios from "axios";

const BASE_URL = "http://localhost:3040/api";

const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = user && JSON.parse(user).user;
export const TOKEN = currentUser?.token;

const apiRequest = axios.create({
  baseURL: BASE_URL,
});

// Todo: configurar interceptores
apiRequest.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": TOKEN,
  };

  return config;
});

export default apiRequest;
