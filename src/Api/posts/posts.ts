import { ICharityPost } from "@/interfaces/interfaces";
import axiosInstance from "../axiosConfig";

export function GetCharityPosts(username: string): Promise<ICharityPost[]> {
  return axiosInstance
    .get(`/Post/charity/${username}`)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity posts:', error);
      throw error;
    });
}