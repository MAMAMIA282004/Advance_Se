import { ICharityProfile, IHomeCharities } from '@/interfaces/interfaces';
import axiosInstance from '../axiosConfig';

export const GetAllCharities = async (): Promise<IHomeCharities[]> => {
  try {
    const response = await axiosInstance.get('/Charity/charities');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching charities:', error);
    throw error;
  }
};

export async function GetCharityByUsername(username: string): Promise<ICharityProfile> {
  try {
    const response = await axiosInstance.get(`/Charity/get-by-username/${username}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching charity by username:', error);
    throw error;
  }
}