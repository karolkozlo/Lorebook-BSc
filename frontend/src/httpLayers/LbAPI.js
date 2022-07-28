import axios from "axios";

const LbAPI = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  withCredentials: true,
})

export default LbAPI;
