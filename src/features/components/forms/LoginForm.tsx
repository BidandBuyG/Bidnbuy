/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import { Form } from "../../../components/ui/form";
import { useEffect, useState } from "react";
import AuthTemplate from "../AuthCardTemplate";
import SubmitButton from "../SubmitButton";
import { Button } from "../../../components/ui/button";
import { getSlideClass } from "../../lib/utils";
import EmailField from "../inputs/EmailField";
import PasswordField from "../inputs/PasswordField";
import type { LoginFormValues } from "../../lib/validations/auth";
import Twitter from "../../assets/x.png";
import Google from "../../assets/google.png";

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
}

export default function LoginForm({
  onSubmit,
  cta = "Login",
  slideFrom = "right",
  isLoading,
  form,
}: LoginFormProps) {
  const [showFieldsShake, setShowFieldsShake] = useState(false);

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Immediately set initial slide (offscreen)
    setSlideIn(false);
    // Then slide in after a tick
    const slideTimer = setTimeout(() => setSlideIn(true), 50); 
    const shakeTimer = setTimeout(() => setShowFieldsShake(true), 500);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(shakeTimer);
    };
  }, []);

  const fieldsTranslateClass = getSlideClass(slideIn, slideFrom);

  const fieldsShakeClass = showFieldsShake ? "animate-shake" : "";

  return (
    <AuthTemplate
      title="Welcome Back 👋"
      description="Log in to continue bidding, buying, and managing your account."
      slideFrom="right"
      cta={cta}
      loading={form.formState.isSubmitting || isLoading}
      footer={
        <span>
          New here?
          <a
            href="/signup"
            className="text-[#EE9F05] underline underline-offset-4 hover:text-[#b89e6a]"
          >
            {" "}
            Create an account
          </a>
        </span>
      }
    >
      <div className="max-w-lg mx-auto w-full">
        {/* Social Login Buttons */}
        <div className="md:flex gap-4 mb-6 w-full space-y-5 md:space-y-0">
          <Button
            variant="outline"
            className="w-full flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800 h-12"
          >
            <img
              src={Google}
              alt="google logo"
              width={16}
              height={16}
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800 h-12"
          >
            <img
              src={Twitter}
              alt="google logo"
              width={16}
              height={16}
              className="w-5 h-5 mr-2"
            />
            Sign in with X
          </Button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <Form {...form}>
            <form
              className="space-y-4 pb-8"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div
                className={`space-y-4 transform transition-transform duration-500 ease-out ${fieldsTranslateClass} ${fieldsShakeClass}`}
              >
                <EmailField control={form.control} name="email" />
                <PasswordField control={form.control} name="password" />
                <div className="flex justify-end">
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline text-white"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <SubmitButton
                cta={cta || "Submit"}
                loading={form.formState.isSubmitting || isLoading}
              />
            </form>
          </Form>
        </div>
      </div>
    </AuthTemplate>
  );
}
