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