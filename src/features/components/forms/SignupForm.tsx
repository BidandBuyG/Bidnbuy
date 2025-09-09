/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { useEffect, useState } from "react";
import AuthTemplate from "../AuthCardTemplate";
import SubmitButton from "../SubmitButton";
import { Button } from "../../../components/ui/button";
import { getSlideClass } from "../../lib/utils";
import EmailField from "../inputs/EmailField";
import PasswordField from "../inputs/PasswordField";
import { SignupFormValues } from "../../lib/validations/auth";
import NameField from "../inputs/NameField";
import Twitter from "../../assets/x.png";
import Google from "../../assets/google.png";
import { Checkbox } from "../../../components/ui/checkbox";

export type SignupFormProps = {
  form: UseFormReturn<SignupFormValues>;
  onSubmit: (values: SignupFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
};

export default function SignupForm({
  onSubmit,
  cta = "Login",
  slideFrom = "left",
  isLoading,
  form,
}: SignupFormProps) {
  const [showFieldsShake, setShowFieldsShake] = useState(false);

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Immediately set initial slide (offscreen)
    setSlideIn(false);
    // Then slide in after a tick
    const slideTimer = setTimeout(() => setSlideIn(true), 50); // 50ms is enough
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
      title="Create Your Bid&Buy Account"
      description="Join now and start bidding, buying, and selling with confidence."
      slideFrom="left"
      cta={cta}
      loading={form.formState.isSubmitting || isLoading}
      footer={
        <span>
          Already have an account?
          <a
            href="/login"
            className="text-[#EE9F05] underline underline-offset-4 hover:text-[#b89e6a]"
          >
            {" "}
            Log in
          </a>
        </span>
      }
    >
      <div className="max-w-lg mx-auto w-full">
        {/* Social Login Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            variant="outline"
            className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800 h-12"
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
            className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800 h-12"
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
                <NameField<SignupFormValues>
                  control={form.control}
                  name="name"
                />
                <EmailField<SignupFormValues>
                  control={form.control}
                  name="email"
                />
                <PasswordField<SignupFormValues>
                  control={form.control}
                  name="password"
                />
                <PasswordField<SignupFormValues>
                  control={form.control}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            className="mt-1 h-4 w-4 rounded border-white bg-white/5 text-[#EE9F05] focus:ring-[#EE9F05] data-[state=checked]:bg-[#EE9F05]"
                            onCheckedChange={(checked: any) =>
                              field.onChange(Boolean(checked))
                            }
                          />
                        </FormControl>
                        <label className="text-sm text-white/80 select-none">
                          I agree to all terms, privacy policy and fees
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <SubmitButton
                cta={cta || "Submit"}
                loading={isLoading}
                loadingText="Loading..."
              />
            </form>
          </Form>
        </div>
      </div>
    </AuthTemplate>
  );
}
