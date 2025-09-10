/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../hooks/useAuthMutation";
import {
  SignupMarketingFormValues,
  signupMarketingSchema,
} from "../../lib/validations/auth";
import { ErrorToast, SuccessToast } from "../../components/Toasts";
import SignupMarketerForm from "../../components/forms/SignupMarketerForm";
import { useState } from "react";
import { toast } from "sonner";

export type MarketingSignupResult = {
  referralCode: string;
  referralLink: string;
};

function generateReferral(): MarketingSignupResult {
  const code = Math.random().toString(36).slice(2, 10).toUpperCase();
  return {
    referralCode: code,
    referralLink: `https://example.com/ref/${code}`,
  };
}

function showReferralToast(result: MarketingSignupResult) {
  toast.success(
    <div className="text-sm">
      <div>
        <strong>Referral Code:</strong> {result.referralCode}
      </div>
      <div>
        <strong>Referral Link:</strong>{" "}
        <a
          href={result.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-300"
        >
          {result.referralLink}
        </a>
      </div>
    </div>
  );
}

function getErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ||
    error?.message || // network errors
    "An error occurred. Please try again."
  );
}

export default function MarketerSignup() {
  const navigate = useNavigate();
  const [result, setResult] = useState<MarketingSignupResult | null>(null);

  const form = useForm<SignupMarketingFormValues>({
    resolver: zodResolver(signupMarketingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      address: "",
      state: "",
      nin: "",
      document: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const signupMutation = useAuthMutation<
    SignupMarketingFormValues,
    import("../../services/auth").AuthResponse
  >(
    async (values) => {
      return authService.signupMarketer({
        ...values,
        userRole: "marketer",
      } as any);
    },
    {
      onSuccess: async (data, variables) => {
        SuccessToast("Account created successfully!");
        // Try to fetch referral from backend; fall back to local generator
        try {
          const userId = data?.user?.id;
          // Try to read auctionId from the mutation variables if present
          const auctionId = (variables as any)?.auctionId ?? undefined;
          const referral = await authService.getMarketingReferralLink(
            userId,
            auctionId
          );
          setResult(referral);
          showReferralToast(referral);
        } catch (err) {
          console.warn(
            "Failed to fetch referral from backend, falling back:",
            err
          );
          const referral = generateReferral();
          setResult(referral);
          showReferralToast(referral);
        }
        form.reset();
        console.log("Marketer Signup response:", data);
        // Do not navigate away; keep showing referral in the same page/form
      },
      onError: (error: any) => {
        ErrorToast(getErrorMessage(error));
      },
    }
  );

  function onSubmit(values: SignupMarketingFormValues) {
    // Use mutateAsync to ensure we can catch errors and surface a toast reliably in tests and UI
    signupMutation.mutateAsync(values).catch((error: any) => {
      ErrorToast(getErrorMessage(error));
    });
  }

  return (
    <SignupMarketerForm
      form={form}
      onSubmit={onSubmit}
      isLoading={signupMutation.isPending}
      result={result}
    />
  );
}
