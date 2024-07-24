import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true, //for cookies
});

export default apiRequest;