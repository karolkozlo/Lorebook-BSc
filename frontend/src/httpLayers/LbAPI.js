import axios from "axios";

const env = {
  production: 'https://lorebook-server-j28lc.ondigitalocean.app/api',
  development: 'http://localhost:8080/api'
};

const LbAPI = axios.create({
  baseURL: env[process.env.NODE_ENV] ? env[process.env.NODE_ENV] : env.development,
  timeout: 5000,
  withCredentials: true,
})

export default LbAPI;
