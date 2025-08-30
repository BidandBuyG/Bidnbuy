import { axiosInstance } from '@/lib/axios';
import type { LoginFormValues, SignupFormValues } from '@/lib/validations/auth';

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'vendor';
  };
}

{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "phoneNumber": "string",
  "userRole": "customer"
}

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/v1/auth/login', data);
    console.log('Login response:', response.data);
    return response.data;
  },

  signup: async (data: SignupFormValues): Promise<AuthResponse> => {
    try {
      
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber, 
        userRole: 'customer', 
      };
      console.log("Payload for sign up", payload)
      const response = await axiosInstance.post<AuthResponse>('/api/v1/auth/signup', payload);
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    const response = await axiosInstance.post('/api/v1/auth/logout');
    console.log("Logout response:", response.data)
  },

  verifyEmail: async (email: string, otpCode: string): Promise<void> => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/verify-email', { email, otpCode });
      console.log('Email verification response:', response.data);
    } catch (error) {
      console.error('Error during email verification:', error);
      throw error;
    }
  },

  profile: async (): Promise<{ user: AuthResponse['user'] }> => {
    const response = await axiosInstance.get('/api/v1/auth/get-user');
    console.log('Profile response:', response.data);
    return response.data;
  }
};