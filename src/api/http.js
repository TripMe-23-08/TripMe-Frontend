import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

http.interceptors.request.use((config) => {
  // config.headers.authorization = 'token'
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  config.headers["Authorization"] = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJhQGEuYSIsInVzZXJJZCI6OCwic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjg0OTg0MTc1LCJleHAiOjE2ODQ5ODc3NzV9.37iTkBlnhytF7bcbAcQIkuLO7mTXu9VADc0ewBXY8i8"
  return config;
});

export default http;
