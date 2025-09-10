/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../hooks/useAuthMutation";
import SignupForm from "../../components/forms/SignupForm";
import { SignupFormValues, signupSchema } from "../../lib/validations/auth";
import { ErrorToast, SuccessToast } from "../../components/Toasts";

export default function Signup() {
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const signupMutation = useAuthMutation<
    SignupFormValues,
    import("../../services/auth").AuthResponse
  >(
    async (values) => {
      return await authService.signup({
        name: values.name,
        email: values.email,
        password: values.password,
        acceptTerms: values.acceptTerms,
        userRole: "vendor",
      } as any);
    },
    {
      onSuccess: (data, variables) => {
        SuccessToast("Account created successfully!");
        form.reset();
        console.log("Vendor Signup response:", data);
        navigate("/marketing/referrals", {
          state: { email: variables.email },
        });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message || // This will catch "Network Error"
          "An error occurred. Please try again.";
        ErrorToast(message);
      },
    }
  );

  function onSubmit(values: SignupFormValues) {
    signupMutation.mutate(values);
  }
  return (
    <SignupForm
      form={form}
      onSubmit={onSubmit}
      isLoading={signupMutation.isPending}
    />
  );
}
