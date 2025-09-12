/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import AuthTemplate from "../AuthCardTemplate";
import { Button } from "../../../components/ui/button";
import { getSlideClass } from "../../lib/utils";
import { Form } from "../../../components/ui/form";
import type { ChangePasswordFormValues } from "../../lib/validations/auth";
import PasswordField from "../inputs/PasswordField";
import { ArrowLeft } from "lucide-react";
import PasswordSuccessImage from "../../assets/password-success.png";

interface LoginFormProps {
  form: UseFormReturn<ChangePasswordFormValues>;
  onSubmit: (values: ChangePasswordFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
  isSuccess?: boolean;
}

export default function ChangePasswordForm({
  onSubmit,
  cta = "Reset Password",
  slideFrom = "right",
  isLoading,
  form,
  isSuccess,
}: LoginFormProps) {
  const [slideIn, setSlideIn] = useState(false);

  console.log(form.formState.errors);

  useEffect(() => {
    // Immediately set initial slide (offscreen)
    setSlideIn(false);
    // Then slide in after a tick
    const slideTimer = setTimeout(() => setSlideIn(true), 50);
    return () => {
      clearTimeout(slideTimer);
    };
  }, []);

  const fieldsTranslateClass = getSlideClass(slideIn, slideFrom);

  return isSuccess ? (
    <AuthTemplate
      title="Password reset successful"
      description="Your password has been reset."
      slideFrom="right"
      footer={""}
    >
      <div className="max-w-lg mx-auto w-full">
        <div className="space-y-4 mb-6">
          <div>
            <img
              src={PasswordSuccessImage}
              alt=""
              className="w-[336px] h-[226px]"
            />
          </div>
        </div>
      </div>
    </AuthTemplate>
  ) : (
    <AuthTemplate
      title="Set new password?"
      description="Must be at least 8 characters."
      slideFrom="right"
      footer={
        <div className="flex items-center justify-center gap-2">
          <ArrowLeft className="mt-1" />
          <a href="/login" className="text-[#EE9F05] hover:text-[#b89e6a]">
            {" "}
            Back to login
          </a>
        </div>
      }
    >
      <div className="max-w-lg mx-auto w-full">
        <div className="space-y-4 mb-6">
          <Form {...form}>
            <form
              className="space-y-4 pb-8"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div
                className={`space-y-4 transform transition-transform duration-500 ease-out ${fieldsTranslateClass}`}
              >
                <PasswordField<ChangePasswordFormValues>
                  control={form.control}
                  name="password"
                />

                <PasswordField<ChangePasswordFormValues>
                  control={form.control}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-3"
                disabled={form.formState.isSubmitting || isLoading}
              >
                {form.formState.isSubmitting || isLoading
                  ? "Submitting..."
                  : cta}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AuthTemplate>
  );
}
