/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PasswordOtpFormValues,
  passwordOtpSchema,
} from "../../../lib/validations/auth";
import { authService } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../../hooks/useAuthMutation";
import { ErrorToast, SuccessToast } from "../../../components/Toasts";
import ForgotOtpForm from "../../components/forms/PasswordOtpForm";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const form = useForm<PasswordOtpFormValues>({
    resolver: zodResolver(passwordOtpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const loginMutation = useAuthMutation<
    PasswordOtpFormValues,
    import("../../../services/auth").AuthResponse
  >(authService.verifyOtpFunc, {
    onSuccess: (data) => {
      try {
        console.log({ data });
      } catch (e) {
        // ignore errors when localStorage isn't available
      }

      SuccessToast("Email Verified successfully!");
      form.reset();
      // navigate("/marketing/referrals");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      ErrorToast(message);
    },
  });

  function onSubmit(values: PasswordOtpFormValues) {
    console.log({ values });
    loginMutation.mutate(values);
  }

  return (
    <ForgotOtpForm
      form={form}
      onSubmit={onSubmit}
      isLoading={loginMutation.isPending}
    />
  );
}
