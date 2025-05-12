export interface ILoginForm {
  email: string
  password: string
}

export interface IUserData {
  userName: string,
  email: string,
  phoneNumber: string,
  address: string,
  fullName: string,
  profilePhotoUrl: string,
  wallpaperPhotoUrl: string,
  isEmailConfirmed: boolean,
  roles: string
  token: string,
  expireAt: string
}

export interface IRegisterForm {
  fullName?: string;
  email?: string;
  password?: string;
  reEnterPassword?: string;
  PhoneNumber?: string;
  pdf?: File;
  address?: string;
}

export interface IHomeCharities {
  userName: string;
  charityName: string;
  photoUrl?: string;
  address: string;
}

export interface ICharityProfile {
  charityName: string;
  address: string;
  profilePhotoURL?: string | null;
  wallpaperPhotoUrl?: string | null;
  description: string;
  email: string;
  phone?: string | null;
  userName: string;
}

export interface ICharityPostComment {
  id: number;
  content: string;
  postId: number;
  createdAt: string;
  user_FullName: string;
  user_PhotoUrl: string;
}


export interface ICharityPost {
  id: number;
  userName: string;
  charityName: string;
  createAt: string;
  content: string;
  photos?: { imgName: string; }[] | null;
  comments?: ICharityPostComment[] | null;
  user_PhotoUrl?: string | null;
}

export interface ICharityBranch {
  phoneNumber: string;
  description: string;
  address: string;
}

export interface ICharityProfileBranches {
  phoneNumber: string;
  description: string;
  address: string;
}


export interface ICharityDonateForm {
  charityUserName: string;
  description: string;
  photos?: File[] | null;
  address: string;
  phone: string;
}

export interface ICharityHelpForm {
  charityUserName: string;
  description: string;
  phone: string;
  address: string;
  photos?: File[] | null;
}

export interface IAdminUser {
  id: string;
  fullName: string;
  email: string;
  createAt: string;
}

export interface IAdminCharity {
  id: string;
  charityName: string;
  createAt: string;
  description: string;
  documentURL: string;
  email: string;
  status: string;
}

export interface IUpdateProfileForm {
  FullName: string;
  Email: string;
  Phone: string;
  Address: string;
  ProfilePhoto: string | null;
  WallpaperPhoto: string | null;
}

export interface IChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUserDonation {
  id: number;
  amount: number | null;
  charityName: string;
  createdAt: string;
  description: string;
  type: "Product" | "Monetary";
  status: string;
}

export interface IUserHelpRequest {
  id: number;
  charityName: string;
  address: string;
  description: string;
  createdAt: string;
  status: string;
}

export interface ICharityDonation {
  id: number;
  amount: number | null;
  charityName: string | null;
  createdAt: string;
  description: string;
  photoUrls: string[];
  status: string;
  type: "Product" | "Monetary";
  userName: string;
}

export interface ICharityHelpRequest {
  id: number;
  userName: string;
  description: string;
  address: string;
  createdAt: string;
  photoUrls: string[];
  status: string;
}

export interface IReport {
  id: number;
  type: "Comment" | "Post" | "User" | "Charity";
  reason: string;
  reporterName: string;
  targetId: number;
  createdAt: string;
}