import { IUserData } from "@/interfaces/interfaces"
import { clsx, type ClassValue } from "clsx"
import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GetUserData(): IUserData | null {
  try {
    const userData = Cookies.get("UserData")
    if (userData) {
      const data: IUserData = JSON.parse(userData);

      // Check if token is expired
      if (data.expireAt && new Date(data.expireAt) < new Date()) {
        Logout();
        return null;
      }

      return data;
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    Logout(); // Clear corrupted data
    return null;
  }
}

export function IsAuthenticated(): boolean {
  const userData = GetUserData();
  return userData !== null && userData.token !== undefined;
}

export function HasRole(role: string): boolean {
  const userData = GetUserData();
  if (!userData || !userData.roles) return false;

  // Handle both string and array formats for roles
  if (Array.isArray(userData.roles)) {
    return userData.roles.some((userRole: string) =>
      userRole.toLowerCase().includes(role.toLowerCase())
    );
  } else if (typeof userData.roles === 'string') {
    return userData.roles.toLowerCase().includes(role.toLowerCase());
  }

  return false;
}

export function Logout() {
  try {
    Cookies.remove("UserData", { path: "/" });
    // Clear any other auth-related cookies
    Cookies.remove("authToken", { path: "/" });

    // Clear localStorage items if any
    localStorage.removeItem("userPreferences");
    localStorage.removeItem("cartItems");

    // Redirect to home page
    window.location.href = "/";
  } catch (error) {
    console.error('Error during logout:', error);
    // Force reload even if error occurs
    window.location.reload();
  }
}

export function SetUserData(userData: IUserData) {
  try {
    Cookies.set('UserData', JSON.stringify(userData), {
      path: '/',
      expires: new Date(userData.expireAt),
      secure: window.location.protocol === 'https:',
      sameSite: 'Strict'
    });
  } catch (error) {
    console.error('Error setting user data:', error);
    throw new Error('Failed to save user session');
  }
}

export function GetAuthToken(): string | null {
  const userData = GetUserData();
  return userData?.token || null;
}

// Utility to check if user needs to verify email
export function IsEmailVerified(): boolean {
  const userData = GetUserData();
  return userData?.isEmailConfirmed || false;
}

// Dashboard redirect helper
export function GetDashboardPath(): string {
  const userData = GetUserData();
  if (!userData) return '/login';

  // Check roles in priority order
  if (HasRole('Admin')) return '/admin-dashboard';
  if (HasRole('Charity')) return '/charity-dashboard';

  // Default to user dashboard
  return '/user-dashboard';
}