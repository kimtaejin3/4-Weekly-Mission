import { getCookie } from "@/utils/cookie";
import axios from "axios";

export const instance = axios.create({
  baseURL: " https://bootcamp-api.codeit.kr/api/linkbrary/v1",
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");
    config.headers!.Authorization = `${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
