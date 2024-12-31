import { AxiosInstance } from "axios";

export const addProfile = async (
  useAxiosPrivate: AxiosInstance,
  data: FormData
) => {
  return await useAxiosPrivate.post("/candidate/add-profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const candidateProfile = async ( useAxiosPrivate: AxiosInstance) =>{
  return await useAxiosPrivate.get("/candidate/profile")
}