import axios from "axios";

const instance = axios.create({
  baseURL: "https://dashboard.pixeltech.es/api",
  // baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default instance;
