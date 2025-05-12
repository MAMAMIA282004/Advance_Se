import { ICharityBranch } from "@/interfaces/interfaces";
import axiosInstance from "../axiosConfig";
import { GetUserData } from "@/lib/utils";
import { AxiosResponse } from "axios";

export function GetCharityBranches(username: string): Promise<ICharityBranch[]> {
  return axiosInstance
    .get(`/Branch/GetCharityBranches/${username}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity branches:', error);
      throw error;
    });
}

export function CreateBranch(data: FormData): Promise<AxiosResponse> {
  return axiosInstance
    .post("/Branch/Create", data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`
      }
    })
    .then((res) => res)
    .catch((err) => {
      console.error('Error creating branch:', err);
      throw err;
    });
}