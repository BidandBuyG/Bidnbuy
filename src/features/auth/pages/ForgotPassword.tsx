/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../../../lib/validations/auth";
import { authService } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../../hooks/useAuthMutation";
import { ErrorToast, SuccessToast } from "../../../components/Toasts";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const loginMutation = useAuthMutation<
    ForgotPasswordFormValues,
    import("../../../services/auth").AuthResponse
  >(authService.verifyEmail, {
    onSuccess: (data) => {
      try {
        console.log({ data });
      } catch (e) {
        // ignore errors when localStorage isn't available
      }

      SuccessToast("Kindly check your mail for OTP!");
      form.reset();
      //  navigate("/marketing/referrals");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      ErrorToast(message);
    },
  });

  function onSubmit(values: ForgotPasswordFormValues) {
    console.log({ values });
    loginMutation.mutate(values);
  }

  return (
    <ForgotPasswordForm
      form={form}
      onSubmit={onSubmit}
      isLoading={loginMutation.isPending}
    />
  );
}
