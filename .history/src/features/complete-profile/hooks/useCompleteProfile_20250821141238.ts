import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth";

import type { CompleteProfilePayload } from "../types/complete-profile";
import { completeUserProfile } from "../services/kyc-service";


type UseCompleteProfileOptions = {
  onSuccessRedirect?: (path: string) => void;
};

export const useCompleteProfile = (options?: UseCompleteProfileOptions) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (payload: CompleteProfilePayload) => {
      const token = useAuthStore.getState().token;
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return completeUserProfile(payload, token);
    },
    onSuccess: (result) => {
      if (result && result.success) {
        toast.success(
          result.message ||
            "Your profile has been successfully updated and wallet created."
        );
        if (options?.onSuccessRedirect) {
          options.onSuccessRedirect("/dashboard");
        } else {
          navigate("/product-home");
        }
      } else {
        toast.error(result.message || "An unexpected error occurred.");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to complete profile. Please try again."
      );
    },
  });
  return mutation;
};