import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import { format } from "date-fns"
import { toast } from "sonner"

import { useAuthStore } from "@/store/auth"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


import type { CompleteProfilePayload } from "./types/kyc"
import { completeUserProfile } from "./services/kyc-service"
import { DatePicker } from "@/components/ui/date-picker"
import CustomFormField from "@/components/custom-form-field/CustomFormField"
import { Form } from "@/components/ui/form"



// Zod schema for validation
const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters.").max(100, "Full Name cannot exceed 100 characters."),
  phoneNumber: z.string().regex(/^0[789][01]\d{8}$/, "Invalid Nigerian phone number format (e.g., 08012345678)."),
  email: z.string().email("Invalid email address."),
  dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date of Birth must be in DD-MM-YYYY format."),
  bvn: z.string().length(11, "BVN must be exactly 11 digits."),
  nin: z.string().length(11, "NIN must be exactly 11 digits."),
  address: z.string().min(5, "Address must be at least 5 characters.").max(250, "Address cannot exceed 250 characters."),
});

type CompleteProfileFormProps = {
  initialData?: Partial<CompleteProfilePayload>;
  onSuccessRedirect?: (path: string) => void; 
}

export function CompleteProfileForm({ initialData, onSuccessRedirect }: CompleteProfileFormProps) {
  const { token } = useAuthStore(); 

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


  const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = form;
  const watchedDateOfBirth = watch("dateOfBirth");

  const handleDateChange = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
   setValue("dateOfBirth", format(date, "dd-MM-yyyy"), { shouldValidate: true });
 } else {
   setValue("dateOfBirth", "", { shouldValidate: true });
 }
  };

  
  const mutation = useMutation({
    mutationFn: (payload: CompleteProfilePayload) => {
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return completeUserProfile(payload, token);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success( result.message || "Your profile has been successfully updated and wallet created.");
        // navigate()
        onSuccessRedirect?.("/dashboard");
      } else {
        toast.error(result.message || "An unexpected error occurred.");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to complete profile. Please try again.");
    },
  });

  const onSubmit = (data: CompleteProfilePayload) => {
    mutation.mutate(data); 
  };

  return (
    <Form {...form}>
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription className="text-gray-300">
          Please provide your KYC details to create your wallet and participate in bidding.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">

          <CustomFormField
            form={form}
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            readOnly={initialData?.fullName !== undefined && initialData.fullName !== ""}
          />

          <CustomFormField
            form={form}
            name="phoneNumber"
            label="Phone Number"
            placeholder="e.g., 08012345678"
            readOnly={initialData?.phoneNumber !== undefined && initialData.phoneNumber !== ""}
          />

          <CustomFormField
            form={form}
            name="email"
            label="Email Address"
            placeholder="e.g., user@example.com"
            type="email"
            readOnly={initialData?.email !== undefined && initialData.email !== ""}
          />

          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth (DD-MM-YYYY)</Label>
            <DatePicker
              date={watchedDateOfBirth ? new Date(watchedDateOfBirth.split('-').reverse().join('-')) : undefined}
              setDate={handleDateChange}
              placeholder="Select your date of birth"
              disabled={mutation.isPending}
            />
            {errors.dateOfBirth && <p className="text-sm text-red-400">{errors.dateOfBirth.message}</p>}
          </div>

          <CustomFormField
  form={form}
  name="dateOfBirth"
  label="Date of Birth (DD-MM-YYYY)"
  placeholder="Select your date of birth"
  datePicker={true}
  date={watchedDateOfBirth ? new Date(watchedDateOfBirth.split('-').reverse().join('-')) : undefined}
  setDate={handleDateChange}
  disabled={mutation.isPending}
/>


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
            className="w-full bg-button-primary hover:bg-button-primary/90 text-white"
            disabled={!isValid || mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Complete Profile & Create Wallet"}
          </Button>
        </CardFooter>
      </form>
    </Card>
    </Form>
  );
}
