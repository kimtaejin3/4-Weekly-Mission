import axios from "axios";

export const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api",
  timeout: 1000,
});
