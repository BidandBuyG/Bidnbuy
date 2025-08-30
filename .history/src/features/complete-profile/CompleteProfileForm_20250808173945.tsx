import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import { format } from "date-fns"
import { toast } from "sonner"

import { completeUserProfile } from "./services/kyc-service"

import { useAuthStore } from "@/store/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import type { CompleteProfilePayload } from "./types/kyc"


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
    if (date) {
      setValue("dateOfBirth", format(date, "dd-MM-yyyy"), { shouldValidate: true });
    } else {
      setValue("dateOfBirth", "", { shouldValidate: true });
    }
  };

  // React Query mutation hook
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
    mutation.mutate(data); // Trigger the mutation
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-form-background text-white">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription className="text-gray-300">
          Please provide your KYC details to create your wallet and participate in bidding.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName")}
              readOnly={initialData?.fullName !== undefined && initialData.fullName !== ""}
              className="bg-transparent border border-input-border-focus text-white placeholder:text-gray-400 focus:ring-button-primary focus:border-button-primary"
            />
            {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="e.g., 08012345678"
              {...register("phoneNumber")}
              readOnly={initialData?.phoneNumber !== undefined && initialData.phoneNumber !== ""}
              className="bg-transparent border border-input-border-focus text-white placeholder:text-gray-400 focus:ring-button-primary focus:border-button-primary"
            />
            {errors.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="e.g., user@example.com"
              type="email"
              {...register("email")}
              readOnly={initialData?.email !== undefined && initialData.email !== ""}
              className="bg-transparent border border-input-border-focus text-white placeholder:text-gray-400 focus:ring-button-primary focus:border-button-primary"
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          .space

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

          <div className="space-y-2">
            <Label htmlFor="nin">NIN (National Identification Number)</Label>
            <Input
              id="nin"
              placeholder="Enter your 11-digit NIN"
              maxLength={11}
              {...register("nin")}
              className="bg-transparent border border-input-border-focus text-white placeholder:text-gray-400 focus:ring-button-primary focus:border-button-primary"
            />
            {errors.nin && <p className="text-sm text-red-400">{errors.nin.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
            <Input
              id="bvn"
              placeholder="Enter your 11-digit BVN"
              maxLength={11}
              {...register("bvn")}
              className="bg-transparent border border-input-border-focus text-white placeholder:text-gray-400 focus:ring-button-primary focus:border-button-primary"
            />
            {errors.bvn && <p className="text-sm text-red-400">{errors.bvn.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your full address"
              className="min-h-[100px] bg-transparent border border-input-border-focus text-white placeholder:text-gray-400 focus:ring-button-primary focus:border-button-primary"
              {...register("address")}
            />
            {errors.address && <p className="text-sm text-red-400">{errors.address.message}</p>}
          </div>
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
  );
}
