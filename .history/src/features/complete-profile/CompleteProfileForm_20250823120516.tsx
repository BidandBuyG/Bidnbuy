import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import CustomFormField from "@/components/custom-form-field/CustomFormField";
import { Form } from "@/components/ui/form";

import { formSchema } from "./complete-profile.validate";
import { useCompleteProfile } from "./hooks/useCompleteProfile";

type CompleteProfileFormProps = {
  initialData?: Partial<CompleteProfilePayload>;
};

export function CompleteProfileForm({
  initialData
}: CompleteProfileFormProps) {


  const form = useForm<CompleteProfilePayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      phoneNumber: initialData?.phoneNumber || "",
      email: initialData?.email || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      bvn: initialData?.bvn || "",
      nin: initialData?.nin || "",
      address: initialData?.address || "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = form;
  
  const completeProfileMutation = useCompleteProfile();
  
  const watchedDateOfBirth = watch("dateOfBirth");

  const handleDateChange = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      setValue("dateOfBirth", format(date, "dd-MM-yyyy"), {
        shouldValidate: true,
      });
    } else {
      setValue("dateOfBirth", "", { shouldValidate: true });
    }
  };

  const onSubmit = (data: CompleteProfilePayload) => {
    completeProfileMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription className="text-gray-300">
            Please provide your KYC details to create your wallet and
            participate in bidding.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <CustomFormField
              form={form}
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              readOnly={
                initialData?.fullName !== undefined &&
                initialData.fullName !== ""
              }
            />

            <CustomFormField
              form={form}
              name="phoneNumber"
              label="Phone Number"
              placeholder="e.g., 08012345678"
              readOnly={
                initialData?.phoneNumber !== undefined &&
                initialData.phoneNumber !== ""
              }
            />

            <CustomFormField
              form={form}
              name="email"
              label="Email Address"
              placeholder="e.g., user@example.com"
              type="email"
              readOnly={
                initialData?.email !== undefined && initialData.email !== ""
              }
            />

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth (DD-MM-YYYY)</Label>
              <DatePicker
                date={
                  watchedDateOfBirth
                    ? new Date(
                        watchedDateOfBirth.split("-").reverse().join("-")
                      )
                    : undefined
                }
                setDate={handleDateChange}
                placeholder="Select your date of birth"
                disabled={completeProfileMutation.isPending}
                className="bg-[#00707B]/30"
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-400">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <CustomFormField
              form={form}
              name="nin"
              label="NIN (National Identification Number)"
              placeholder="Enter your 11-digit NIN"
              type="text"
            />

            <CustomFormField
              form={form}
              name="bvn"
              label="BVN (Bank Verification Number)"
              placeholder="Enter your 11-digit BVN"
              type="text"
            />

            <CustomFormField
              form={form}
              name="address"
              label="Address"
              placeholder="Enter your full address"
              textarea={true}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full mt-4 bg-teal-300 hover:text-teal-200 text-white"
              disabled={!isValid || completeProfileMutation.isPending}
            >
              {completeProfileMutation.isPending
                ? "Submitting..."
                : "Complete Profile & Create Wallet"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
