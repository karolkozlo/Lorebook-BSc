import axios from "axios";

const LbAPI = axios.create({
  baseURL: "https://ec2-3-75-217-172.eu-central-1.compute.amazonaws.com/api",
  timeout: 5000,
  withCredentials: true,
})

export default LbAPI;
