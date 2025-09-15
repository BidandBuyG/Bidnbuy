/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import { getSlideClass } from "../../../lib/utils";
import EmailField from "../../../components/inputs/EmailField";
import { SignupMarketingFormValues } from "../../../lib/validations/auth";
import NameField from "../../../components/inputs/NameField";
import { Mail, Upload } from "lucide-react";
import { Input } from "../../../components/ui/input";
import AuthTemplate from "../../components/AuthCardTemplate";
import SubmitButton from "@/components/SubmitButton";
import ReferralCodeUI from "./ReferralCodeUI";


export type SignupMarketerFormProps = {
  form: UseFormReturn<SignupMarketingFormValues>;
  onSubmit: (values: SignupMarketingFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
  result?: { referralCode: string; referralLink: string } | null;
};

export default function SignupMarketerForm({
  onSubmit,
  cta = "Submit",
  slideFrom = "left",
  isLoading,
  form,
  result = null,
}: SignupMarketerFormProps) {
  const [showFieldsShake, setShowFieldsShake] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  // multi-step state
  const totalSteps = 4;
  const [step, setStep] = useState(1);
  const progress = useMemo(() => (step / totalSteps) * 100, [step]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    setSlideIn(false);
    const slideTimer = setTimeout(() => setSlideIn(true), 50);
    const shakeTimer = setTimeout(() => setShowFieldsShake(true), 500);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(shakeTimer);
    };
  }, []);

  // When parent provides a referral result (after successful signup), show step 4
  useEffect(() => {
    if (result) {
      setStep(4);
    }
  }, [result]);

  const fieldsTranslateClass = getSlideClass(slideIn, slideFrom);
  const fieldsShakeClass = showFieldsShake ? "animate-shake" : "";

  async function handleNext() {
    if (step === 1) {
      const valid = await form.trigger(["firstName", "lastName", "email"]);
      if (!valid) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      const valid = await form.trigger(["address", "state"]);
      if (!valid) return;
      setStep(3);
      return;
    }
  }

  // function handleBack() {
  //   if (step > 1) setStep((s) => s - 1);
  // }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await form.trigger();
    if (!ok) return;
    onSubmit(form.getValues());
  }

  return (
    <AuthTemplate
      title="Create your Business account"
      description="Reach more buyers, Sell faster, Earn more."
      slideFrom="left"
      cta={cta}
      loading={form.formState.isSubmitting || isLoading}
      showHeader={step !== 4}
      showFooter={step !== 4}
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
        {/* Progress loader */}
        <div className="mb-6">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#EE9F05] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* <div className="flex justify-between text-xs text-white/70 mt-2">
            <span>Account</span>
            <span>Address</span>
            <span>Documents</span>
            <span>Referral</span>
          </div> */}
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <Form {...form}>
            <form
              className="space-y-4 pb-8"
              onSubmit={handleFinalSubmit}
              noValidate
            >
              <div
                className={`space-y-4 transform transition-transform duration-500 ease-out ${fieldsTranslateClass} ${fieldsShakeClass}`}
              >
                {step === 1 && (
                  <>
                    <div className="md:flex gap-4 w-full space-y-5 md:space-y-0 justify-between">
                      <NameField<SignupMarketingFormValues>
                        control={form.control}
                        name="firstName"
                        placeholder="Enter your first name"
                      />
                      <NameField<SignupMarketingFormValues>
                        control={form.control}
                        name="lastName"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <EmailField<SignupMarketingFormValues>
                      control={form.control}
                      name="email"
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <Mail className="absolute left-3 top-4 h-4 w-4 text-white pointer-events-none" />
                            <FormControl>
                              <textarea
                                placeholder="A short description"
                                className="w-full min-h-[96px] pl-10 pr-3 pt-3 pb-3 rounded-lg border border-[#0a1b1d] text-white placeholder:text-white bg-[#007F931F]"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="State of Residence"
                              className="h-12 bg-[#007F931F] border border-[#0a1b1d] text-white placeholder:text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <Mail className="absolute left-3 top-4 h-4 w-4 text-white pointer-events-none" />
                            <FormControl>
                              <textarea
                                placeholder="Your address"
                                className="w-full min-h-[96px] pl-10 pr-3 pt-3 pb-3 rounded-lg border border-[#0a1b1d] text-white placeholder:text-white bg-[#007F931F]"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <FormField
                      control={form.control}
                      name="nin"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="NIN"
                              className="h-12 bg-[#007F931F] border border-[#0a1b1d] text-white placeholder:text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="document"
                      render={({ field }) => (
                        <FormItem>
                          <div className="p-4 bg-[#007F931F] rounded-md">
                            <label
                              htmlFor="document"
                              className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
                            >
                              <div className="mb-2 bg-muted rounded-full p-3">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <p className="text-[16px] font-medium text-white">
                                Upload Documents
                              </p>
                              <p className="text-muted-foreground mt-1 text-sm">
                                Accepted: PDF, PNG, JPG (4MB max)
                              </p>
                            </label>

                            <FormControl>
                              <input
                                type="file"
                                id="document"
                                accept="image/*,application/pdf"
                                onChange={async (e) => {
                                  const f = e.target.files?.[0] ?? null;
                                  setUploadedFile(f);
                                  field.onChange(f);
                                  await form.trigger("document");
                                }}
                                className="hidden"
                              />
                            </FormControl>
                          </div>

                          {uploadedFile ? (
                            <p className="text-xs text-white/70 mt-2">
                              Selected: {uploadedFile.name}
                            </p>
                          ) : null}

                          <FormMessage />

                          <div className="mt-4">
                            <SubmitButton
                              cta={cta || "Submit"}
                              loading={form.formState.isSubmitting || isLoading}
                              type="button"
                              loadingText="Loading..."
                              onClick={async () => {
                                const valid = await form.trigger();
                                if (!valid) return;
                                // call parent submit to perform signup
                                onSubmit(form.getValues());
                              }}
                            />
                          </div>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 4 && (
                  <>
                    <ReferralCodeUI result={result} />
                  </>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3">
                {/* {step > 1 && step <= totalSteps && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="h-12 border-white/20 text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )} */}

                <Button
                  type="button"
                  aria-label="proceed"
                  onClick={handleNext}
                  className={`${
                    step < totalSteps && step !== 3
                      ? "flex-1 bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-3 transition-transform duration-500 ease-out"
                      : "hidden"
                  }`}
                >
                  Proceed
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AuthTemplate>
  );
}
