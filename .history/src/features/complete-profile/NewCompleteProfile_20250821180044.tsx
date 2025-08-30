"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import CustomFormField from "@/components/custom-form-field/CustomFormField"
import { Form } from "@/components/ui/form"

import { useProfileStore } from "@/stores/profileStore"
import { useProfileMutation } from "@/hooks/useProfileMutation"

import { profileFormSchema, type ProfileFormData } from "../types/profileTypes"
import { transformProfileDataForAPI } from "../utils/profileUtils"

export function CompleteProfileForm() {
  const { toast } = useToast()
  const { profileData, updateProfile, getDefaultFormValues } = useProfileStore()

  // React Query mutation
  const completeProfileMutation = useProfileMutation({
    onSuccess: (data) => {
      toast("Profile updated and wallet created successfully", "success")
      updateProfile(data)
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to update profile"
      toast(errorMessage, "error")
    },
  })

  // Form setup with Zustand default values
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultFormValues(),
  })

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = form

  const watchedDateOfBirth = watch("dateOfBirth")

  // Handle date picker changes
  const handleDateChange = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      setValue("dateOfBirth", format(date, "dd/MM/yyyy"), {
        shouldValidate: true,
      })
    } else {
      setValue("dateOfBirth", "", { shouldValidate: true })
    }
  }

  // Form submission
  const onSubmit = (data: ProfileFormData) => {
    const apiPayload = transformProfileDataForAPI(data)
    completeProfileMutation.mutate(apiPayload)
  }

  return (
    <Form {...form}>
      <Card className="w-full max-w-lg mx-auto bg-teal-800/30 backdrop-blur-sm border-teal-700/30">
        <CardHeader>
          <CardTitle className="text-white">Complete Your Profile</CardTitle>
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
              readOnly={profileData?.fullName !== undefined && profileData.fullName !== ""}
            />

            <CustomFormField
              form={form}
              name="phoneNumber"
              label="Phone Number"
              placeholder="e.g., 08012345678"
              readOnly={profileData?.phoneNumber !== undefined && profileData.phoneNumber !== ""}
            />

            <CustomFormField
              form={form}
              name="email"
              label="Email Address"
              placeholder="e.g., user@example.com"
              type="email"
              readOnly={profileData?.email !== undefined && profileData.email !== ""}
            />

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-gray-300">
                Date of Birth (DD/MM/YYYY)
              </Label>
              <DatePicker
                date={watchedDateOfBirth ? new Date(watchedDateOfBirth.split("/").reverse().join("-")) : undefined}
                setDate={handleDateChange}
                placeholder="Select your date of birth"
                disabled={completeProfileMutation.isPending}
                className="bg-[#00707B]/30 text-white border-teal-600"
              />
              {errors.dateOfBirth && <p className="text-sm text-red-400">{errors.dateOfBirth.message}</p>}
            </div>

            <CustomFormField
              form={form}
              name="nin"
              label="NIN (National Identification Number) - Optional"
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
              className="w-full mt-4 bg-[#00707B] hover:bg-[#00707B]/80 text-white"
              disabled={!isValid || completeProfileMutation.isPending}
            >
              {completeProfileMutation.isPending ? "Submitting..." : "Complete Profile & Create Wallet"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  )
}
