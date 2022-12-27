/* eslint-disable no-param-reassign */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3040/api";

const token = localStorage.getItem("token");

const apiRequest = axios.create({
  baseURL: BASE_URL,
});

// Todo: configurar interceptores
apiRequest.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": token,
  };

  return config;
});

export default apiRequest;
