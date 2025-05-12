import { GetUserData } from "@/lib/utils"
import axiosInstance from "../axiosConfig"

export function RequestHelp(data: FormData) {
  return axiosInstance
    .post(`/HelpRequest/CreateHelpRequest`, data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
}

export function GetUserHelpRequests() {
  return axiosInstance
    .get(`/HelpRequest/user`, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity branches:', error)
      throw error
    })
}

export function ChangeHelpRequestStatus(requestId: number, newStatus: string) {
  return axiosInstance
    .put("/HelpRequest/UpdateHelpRequest", {
      requestId,
      newStatus,
    }, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching charity branches:', error);
      throw error;
    });
}

export function GetCharityHelpRequests() {
  return axiosInstance
    .get(`/HelpRequest/charity`, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity help requests:', error);
      throw error;
    });
}