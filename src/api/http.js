import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

http.interceptors.request.use((config) => {
  // config.headers.authorization = 'token'
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  config.headers["Authorization"] =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJhQGEuYSIsInVzZXJJZCI6OCwic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjg0OTk0OTA1LCJleHAiOjE2ODQ5OTg1MDV9.3sq8KLFlLKbo2DTKotVAnhF66t1b4QwMtg71ZZIV4r0";
  return config;
});

export default http;
