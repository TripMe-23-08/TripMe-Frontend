import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:80/api/v1",
});

http.interceptors.request.use((config) => {
  // config.headers.authorization = 'token'
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  return config;
});

export default http;
