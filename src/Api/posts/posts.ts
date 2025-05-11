import { ICharityPost } from "@/interfaces/interfaces";
import axiosInstance from "../axiosConfig";
import { GetUserData } from "@/lib/utils";

export function GetCharityPosts(username: string): Promise<ICharityPost[]> {
  return axiosInstance
    .get(`/Post/charity/${username}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity posts:', error);
      throw error;
    });
}

export function CreateComment(data: FormData) {
  return axiosInstance
    .post(`/Comment/CreateComment`, data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
}

export function EditComment(id: number, data: { content: string }) {
  return axiosInstance
    .put(`/Comment/EditComment/${id}`, data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
}

export function DeleteComment(id: number) {
  return axiosInstance
    .delete(`/Comment/DeleteComment/${id}`, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
      },
    })
}