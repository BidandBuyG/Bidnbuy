import axios from 'axios';
import { CompleteProfilePayload } from '@/types/kyc';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5173';

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
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/complete-profile`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      success: true,
      message: response.data.message || "Profile completed and wallet created successfully.",
      user: response.data.user,
    };
  } catch (error: any) {
    // Axios errors have a response object for HTTP errors
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to complete profile.",
        errors: error.response.data.errors,
      };
    }
    // Generic error
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
