import axios from "axios";
import { env } from "../constants/env.config";

const instance = axios.create({
  baseURL: env.BASEURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: env.BASEURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default instance;
