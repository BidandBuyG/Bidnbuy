/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import AuthTemplate from "../AuthCardTemplate";
import { Button } from "../../../components/ui/button";
import { getSlideClass } from "../../../lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import type { PasswordOtpFormValues } from "../../../lib/validations/auth";
import { ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../components/ui/input-otp";

interface LoginFormProps {
  form: UseFormReturn<PasswordOtpFormValues>;
  onSubmit: (values: PasswordOtpFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
}

export default function ForgotOtpForm({
  onSubmit,
  cta = "Continue",
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
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      {/* <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-3"
                disabled={form.formState.isSubmitting || isLoading}
              >
                {form.formState.isSubmitting || isLoading
                  ? "Verifying..."
                  : cta}
              </Button>
            </form>
            <p className="text-white text-center pb-5">
              <span>
                Did not receive the email?
                <a
                  href="/vendor/signup"
                  className="text-[#EE9F05] hover:text-[#b89e6a]"
                >
                  {" "}
                  Click here
                </a>
              </span>
            </p>
          </Form>
        </div>
      </div>
    </AuthTemplate>
  );
}
