import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://dwelling-4.onrender.com/api",
  withCredentials: true, //for cookies
});

export default apiRequest;