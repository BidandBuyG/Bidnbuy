import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth";

import type { CompleteProfilePayload } from "../types/complete-profile";
import { completeUserProfile } from "../services/kyc-service";



export const useCompleteProfile = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (payload: CompleteProfilePayload) => {

      const result = authService.profile(payload);
      return result;
      // const token = useAuthStore.getState().token;
      // if (!token) {
      //   throw new Error("Authentication token is missing.");
      // }

      // const result = await completeUserProfile(payload);
      // return result;
    },
    onSuccess: async (result) => {
      // After profile completion, check wallet status
      try {
        const walletRes = await import("@/services/wallet").then(m => m.getWalletStatus());
        const status = walletRes?.data?.wallet?.status || walletRes?.data?.status;
        if (status === "active") {
          toast.success("Wallet created successfully");
        } else if (status === "pending") {
          toast.info("Wallet creation pending, please check back");
        } else if (status === "failed") {
          toast.error("Wallet creation failed, contact support");
        } else {
          toast.success(result.message || "Your profile has been successfully updated and wallet created.");
        }
      } catch (e) {
        toast.success(result.message || "Your profile has been successfully updated and wallet created.");
      }
      // Redirect to wallet ledger page
      navigate("/wallet-ledger");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to complete profile. Please try again."
      );
    },
  });
  return mutation;
};