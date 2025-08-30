import axios from 'axios';
import type { CompleteProfilePayload } from '../types/complete-profile';
import axiosInstance from '@/lib/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL

type ApiResponse = {
  success: boolean;
  message: string;
  user?: any; 
  errors?: any; 
}

export const completeUserProfile = async (
  data: CompleteProfilePayload,
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.patch(
      `${API_BASE_URL}/api/v1/auth/update-profile`,
      data,
      { withCredentials: true }
    );
    return {
      success: true,
      message: response.data.message || "Profile completed and wallet created successfully.",
      user: response.data.user,
    };
  } catch (error: any) {
   
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to complete profile.",
        errors: error.response.data.errors,
      };
    }
 
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
