import { IRegisterForm, IUserData } from '@/interfaces/interfaces';
import axiosInstance from '../axiosConfig';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const LoginCall = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/Auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const RegisterCharityCall = async (data: IRegisterForm) => {
  try {
    const response = await axiosInstance.post('/Auth/RegisterCharity', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const RegisterUserCall = async (data: IRegisterForm) => {
  try {
    const response = await axiosInstance.post('/Auth/RegisterUser', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};