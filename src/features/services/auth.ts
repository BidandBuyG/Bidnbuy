/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../lib/axios";
import type {
  LoginFormValues,
  SignupFormValues,
  SignupMarketingFormValues,
} from "../lib/validations/auth";

export type AuthResponse = {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "customer" | "vendor";
  };
};

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/v1/auth/login",
        data
      );
      console.log(
        "Login response status:",
        response.status,
        "data:",
        response.data
      );

      // Handle 204 No Content or responses with no body by synthesizing a response
      if (!response.data || Object.keys(response.data).length === 0) {
        const tokenFromHeader =
          (response.headers as any)["x-auth-token"] || "dev-fake-token";
        const synthesized: AuthResponse = {
          success: true,
          message: response.statusText || "No content",
          token: tokenFromHeader,
          user: {
            id: "1",
            email: (data as any)?.email || "dev@example.com",
            name: "",
            role: "customer",
          },
        };
        console.warn(
          "No body returned from login endpoint; using synthesized response:",
          synthesized
        );
        return synthesized;
      }

      console.log("Login response:", response.data);
      return response.data;
    } catch (err: any) {
      // Better error for network/CORS issues
      if (err?.request && !err?.response) {
        const message =
          "Network or CORS error: Unable to reach authentication server. Check VITE_API_URL and CORS settings on the API server.";
        console.error(message, err);
        // Throw an error with a clearer message to be handled by calling code
        throw new Error(message);
      }
      // Re-throw axios error for downstream handling
      throw err;
    }
  },

  signup: async (data: SignupFormValues): Promise<AuthResponse> => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      acceptTerms: data.acceptTerms,
      userRole: "customer",
    };
    console.log("Payload for sign up", payload);
    const response = await axiosInstance.post<AuthResponse>(
      "/api/v1/auth/signup",
      payload
    );
    console.log("Signup response:", response.data);
    return response.data;
  },

  signupMarketer: async (
    data: SignupMarketingFormValues
  ): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    if (data.description) formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("nin", data.nin);
    if (data.document instanceof File) {
      formData.append("document", data.document);
    }
    formData.append("userRole", "marketer");

    const response = await axiosInstance.post<AuthResponse>(
      "/api/v1/marketing/register-user",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Skip-Auth-Redirect": "1",
        },
      }
    );
    console.log("Marketer signup response:", response.data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    const response = await axiosInstance.post("/api/v1/auth/logout");
    console.log("Logout response:", response.data);
  },

  verifyEmail: async ({ email }: { email: string }): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/api/v1/auth/forgot-password", {
      email,
    });
    console.log("Email verification response:", response.data);
    return response.data;
  },

  verifyOtpFunc: async ({ otp }: { otp: string }): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/api/v1/auth/verify-email", {
      otp,
    });
    console.log("Email verification response:", response.data);
    return response.data;
  },

  resendOtp: async ({ email }: { email: string }): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/api/v1/auth/resend-otp", {
      email,
    });
    console.log("Email verification response:", response.data);
    return response.data;
  },

  changePasswordFunc: async ({
    password,
    confirmPassword,
    token,
  }: {
    password: string;
    confirmPassword: string;
    token: string | null;
  }): Promise<AuthResponse> => {
    const response = await axiosInstance.post(
      `/api/v1/auth/reset-password?token=${token}`,
      {
        password,
        confirmPassword,
      }
    );
    console.log("Email verification response:", response.data);
    return response.data;
  },

  /**
   * Request a referral link for a marketer from the backend.
   * Endpoint: /user/api/v1/marketing/referral-link
   * Expects a body like { userId?: string }
   */
  getMarketingReferralLink: async (
    userId?: string,
    auctionId?: string
  ): Promise<{ referralCode: string; referralLink: string }> => {
    const payload: any = {};
    if (userId) payload.userId = userId;
    if (auctionId) payload.auctionId = auctionId;
    const response = await axiosInstance.post<{
      referralCode: string;
      referralLink: string;
    }>("/user/api/v1/marketing/referral-link", payload);
    return response.data;
  },
};
