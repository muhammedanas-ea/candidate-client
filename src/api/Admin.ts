import { AxiosInstance } from "axios";
import { CandidateProps } from "../types/types";

export const addCandidate = async (
  useAxiosPrivate: AxiosInstance,
  data: CandidateProps
) => {
  return await useAxiosPrivate.post("/admin/candidate/create", data);
};

export const candidateList = async (useAxiosPrivate: AxiosInstance) => {
  return await useAxiosPrivate.get("/admin/candidates");
};

export const deleteCandidate = async (
  useAxiosPrivate: AxiosInstance,
  id: string
) => {
  return await useAxiosPrivate.delete(`/admin/candidate/delete/${id}`);
};
