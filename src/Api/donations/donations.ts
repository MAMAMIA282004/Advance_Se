import { GetUserData } from "@/lib/utils";
import axiosInstance from "../axiosConfig";
import { ICharityDonateForm } from "@/interfaces/interfaces";

export function DonateWithMoney(charityUserName: string, amount: number = 0): Promise<{ url: string }> {
  return axiosInstance
    .post(`/Donations/monetary`, {
      charityUserName,
      amount,
    },
      {
        headers: {
          Authorization: `Bearer ${GetUserData()?.token}`
        }
      },
    )
    .then((response) => response.data.data)
    .catch((error) => {
      console.error('Error fetching charity branches:', error);
      throw error;
    });
}

export function DonateWithItem(data: FormData) {
  return axiosInstance
    .post(`/Donations/item`, data, {
      headers: {
        Authorization: `Bearer ${GetUserData()?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
}