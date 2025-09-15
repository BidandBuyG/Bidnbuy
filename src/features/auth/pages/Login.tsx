/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginForm from "../../components/forms/LoginForm";
import {
  loginSchema,
  type LoginFormValues,
} from "../../../lib/validations/auth";
import { authService } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../../hooks/useAuthMutation";
import { ErrorToast, SuccessToast } from "../../../components/Toasts";

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const loginMutation = useAuthMutation<
    LoginFormValues,
    import("../../../services/auth").AuthResponse
  >(authService.login, {
    onSuccess: (data) => {
      try {
        const token = (data as any)?.token || "dev-fake-token";
        const user = (data as any)?.user;
        // || {
        //   id: "1",
        //   email: "dev@example.com",
        //   phoneNumber: "08130039337",
        //   name: "Favour the React dev",
        //   role: "customer",
        // };
        localStorage.setItem(
          "auth-storage",
          JSON.stringify({ state: { token, user, isAuthenticated: !!token } })
        );
      } catch (e) {
        // ignore errors when localStorage isn't available
      }

      SuccessToast("Logged In successfully!");
      form.reset();
      navigate("/marketing/referrals");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      ErrorToast(message);
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log({ values });
    loginMutation.mutate(values);
  }

  return (
    <LoginForm
      form={form}
      onSubmit={onSubmit}
      isLoading={loginMutation.isPending}
    />
  );
}
