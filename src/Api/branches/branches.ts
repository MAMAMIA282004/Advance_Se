import { ICharityBranch } from "@/interfaces/interfaces";
import axiosInstance from "../axiosConfig";

export function GetCharityBranches(username: string): Promise<ICharityBranch[]> {
  return axiosInstance
    .get(`/Branch/GetCharityBranches/${username}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity branches:', error);
      throw error;
    });
}