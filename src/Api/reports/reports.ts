import { GetUserData } from "@/lib/utils";
import axiosInstance from "../axiosConfig";

export function GetAllReports() {
  return axiosInstance
    .get('/Report/All', {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`
      }
    })
    .then(response => response.data.data)
    .catch(error => {
      console.error('Error fetching reports:', error);
      throw error;
    });
}

export function CreateReport(data: {
  targetId: number;
  type: string;
  reason: string;
}) {
  return axiosInstance
    .post('/Report/Create', data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`
      }
    })
    .then(response => response)
    .catch(error => {
      console.error('Error creating report:', error);
      throw error;
    });
}