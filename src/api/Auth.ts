import { LoginProps } from "../types/types";
import axios from "../utils/axios"

export const AuthLogin = async (data:LoginProps) => {
  return await axios.post("/auth/login", data);
};
