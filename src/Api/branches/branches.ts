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
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${GetUserData()?.token}`
      }
    })
    .then((res) => res)
    .catch((err) => {
      console.error('Error creating branch:', err);
      throw err;
    });
}

export function EditBranch(
  id: number,
  data: FormData
): Promise<AxiosResponse> {
  return axiosInstance
    .put(`/Branch/Update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${GetUserData()?.token}`
      }
    })
    .then((res) => res)
    .catch((err) => {
      console.error('Error editing branch:', err);
      throw err;
    });
}

export function DeleteBranch(id: number): Promise<AxiosResponse> {
  return axiosInstance
    .delete(`/Branch/Delete/${id}`, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`
      }
    })
    .then((res) => res)
    .catch((err) => {
      console.error('Error deleting branch:', err);
      throw err;
    });
}