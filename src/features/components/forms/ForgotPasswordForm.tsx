/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import { Form } from "../../../components/ui/form";
import { useEffect, useState } from "react";
import AuthTemplate from "../AuthCardTemplate";
import { Button } from "../../../components/ui/button";
import { getSlideClass } from "../../../lib/utils";
import EmailField from "../../../components/inputs/EmailField";
import type { ForgotPasswordFormValues } from "../../../lib/validations/auth";
import { ArrowLeft } from "lucide-react";

interface LoginFormProps {
  form: UseFormReturn<ForgotPasswordFormValues>;
  onSubmit: (values: ForgotPasswordFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
}

export default function ForgotPasswordForm({
  onSubmit,
  cta = "Reset Password",
  slideFrom = "right",
  isLoading,
  form,
}: LoginFormProps) {
  const [slideIn, setSlideIn] = useState(false);

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

  return (
    <AuthTemplate
      title="Forgot  Password?"
      description="No worries we will send you reset instructions."
      slideFrom="right"
      cta={cta}
      loading={form.formState.isSubmitting || isLoading}
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
        {/* Form Fields */}
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
                <EmailField<ForgotPasswordFormValues>
                  control={form.control}
                  name="email"
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
