/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangePasswordFormValues,
  changepasswordSchema,
} from "../../../lib/validations/auth";
import { authService } from "../../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../../hooks/useAuthMutation";
import { ErrorToast, SuccessToast } from "../../../components/Toasts";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";

export default function ChangePassword() {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  const token = "dummy-token";

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changepasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token ?? undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const loginMutation = useAuthMutation<
    ChangePasswordFormValues,
    import("../../../services/auth").AuthResponse
  >(authService.changePasswordFunc, {
    onSuccess: (data) => {
      try {
        console.log({ data });
      } catch (e) {
        // ignore errors when localStorage isn't available
      }

      SuccessToast("Password set successfully!");
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

  function onSubmit(values: ChangePasswordFormValues) {
    console.log({ values });
    loginMutation.mutate(values);
  }

  return (
    <ChangePasswordForm
      form={form}
      onSubmit={onSubmit}
      isLoading={loginMutation.isPending}
    />
  );
}
