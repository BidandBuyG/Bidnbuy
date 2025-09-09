/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "../../hooks/useAuthMutation";
import SignupForm from "../../components/forms/SignupForm";
import { SignupFormValues, signupSchema } from "../../lib/validations/auth";

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
  });

  const loginMutation = useAuthMutation<
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
        toast.success("Account created successfully!");
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
        toast.error(message);
      },
    }
  );

  function onSubmit(values: SignupFormValues) {
    loginMutation.mutate(values);
  }
  return (
    <SignupForm
      form={form}
      onSubmit={onSubmit}
      isLoading={loginMutation.isPending}
    />
  );
}
