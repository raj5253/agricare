// axiosInstance.js
"use server";
import axios from "axios";
import { auth } from "@clerk/nextjs";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://localhost:3000/api/";
axiosInstance.defaults.timeout = 999999999; // Set a reasonable timeout, e.g., 10 seconds

axiosInstance.interceptors.request.use(function (config) {
  // Do something before the request is sent
  // const { id, userId } = auth();

  // if (id && userId) {
  //   config.headers["id"] = id;
  //   config.headers["userId"] = userId;
  // }

  return config;
});

export default axiosInstance;
