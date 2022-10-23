import axios from "axios";

const env = {
  production: 'https://ec2-35-158-239-89.eu-central-1.compute.amazonaws.com/api',
  development: 'http://localhost:8080/api'
};

const LbAPI = axios.create({
  baseURL: env[process.env.NODE_ENV] ? env[process.env.NODE_ENV] : env.development,
  timeout: 5000,
  withCredentials: true,
})

export default LbAPI;
