import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth";

import type { CompleteProfileFormProps, CompleteProfilePayload } from "../types/complete-profile";
import { completeUserProfile } from "../services/kyc-service";
import { toast } from "sonner";


  

export const useCompleteProfile = (onSuccessRedirect: CompleteProfileFormProps) => {
    const { token } = useAuthStore();
    const completeProfile = useMutation({
        mutationFn: (payload: CompleteProfilePayload) => {
          if (!token) {
            throw new Error("Authentication token is missing.");
          }
          return completeUserProfile(payload, token);
        },
        onSuccess: (result) => {
          if (result.success) {
            toast.success(
              result.message ||
                "Your profile has been successfully updated and wallet created."
            );
            // navigate()
            onSuccessRedirect?.("/dashboard");
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

      return completeProfile;
}