import { IUserData } from "@/interfaces/interfaces"
import { clsx, type ClassValue } from "clsx"
import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GetUserData(): IUserData {
  const userData = Cookies.get("UserData")
  if (userData) {
    const data: IUserData = JSON.parse(userData);
    return data;
  }
  return null
}

export function Logout() {
  Cookies.remove("UserData", { path: "/" });
  window.location.reload();
}