import { GetUserData } from "@/lib/utils";
import axiosInstance from "../axiosConfig";
import { IAdminCharity, IAdminUser } from "@/interfaces/interfaces";

export function GetUsersData(): Promise<IAdminUser[]> {
  return axiosInstance.get("/Admin/users", {
    headers: {
      Authorization: `Bearer ${GetUserData()?.token}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error("Error fetching users data:", error);
      throw error;
    });
}

export function DeleteUser(userId: string) {
  return axiosInstance
    .delete(`/Admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      throw error;
    });
}

export function GetCharitiesData(status: string): Promise<IAdminCharity[]> {
  return axiosInstance
    .get(`/Admin/charities` + (status !== "" ? `?status=${status}` : ""), {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error("Error fetching charities data:", error);
      throw error;
    });
}

export function ApproveCharity(charityId: string) {
  return axiosInstance
    .put(`Admin/accept-charity/${charityId}`, {}, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
}