import { GetUserData } from "@/lib/utils";
import axiosInstance from "../axiosConfig";
import { IChangePasswordForm } from "@/interfaces/interfaces";

export function GetUserProfileData() {
  return axiosInstance.get('/Auth/me', {
    headers: {
      Authorization: `Bearer ${GetUserData()?.token}`,
    },
  })
    .then((response) => response.data.data)
    .catch((error) => {
      throw new Error('Failed to fetch user profile data: ' + error.message);
    });
}

export function UpdateUserProfile(data: FormData) {
  return axiosInstance
    .put('/Auth/update-profile', data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error('Failed to update user profile: ' + error.message);
    });
}

export function UpdateUserPassword(data: IChangePasswordForm) {
  return axiosInstance
    .post('/Auth/change-password', data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error('Failed to update user password: ' + error.message);
    });
}