/**
 * Profile Page Container Component
 *
 * Container component responsible for:
 * - Managing profile state and form logic
 * - Handling API calls and data mutations
 * - Coordinating between desktop and mobile layouts
 * - Managing edit mode state
 */


import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useRouter } from "next/navigation"

import { ProfileDesktopLayout } from "./layouts/ProfileDesktopLayout"
import { ProfileMobileLayout } from "./layouts/ProfileMobileLayout"
import { useProfileStore } from "@/stores/profileStore"
import { useProfileMutation } from "@/hooks/useProfileMutation"
import { useToast } from "@/hooks/useToast"
import { profileFormSchema, type ProfileFormData } from "./types/profileTypes"
import { transformProfileDataForAPI } from "./utils/profileUtils"

export function ProfilePageContainer() {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Zustand store for profile data
  const { profileData, updateProfile } = useProfileStore()

  // React Query mutation for API calls
  const profileMutation = useProfileMutation({
    onSuccess: (data) => {
      toast("Profile updated and wallet created successfully", "success")
      updateProfile(data)
      setIsEditing(false)
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update profile. Please try again."
      toast(errorMessage, "error")
    },
  })

  // Form configuration with default values from store
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: profileData.fullName || "Sophia Clark",
      phoneNumber: profileData.phoneNumber || "+2348153133879",
      email: profileData.email || "sophiaclark@gmail.com",
      dateOfBirth: profileData.dateOfBirth || "1/05/2000",
      address: profileData.address || "No 6 main road, Lagos, Nigeria",
      idType: profileData.idType || "NIN",
      idNumber: profileData.idNumber || "1002358732",
      bvn: profileData.bvn || "",
      nin: profileData.nin || "",
    },
  })

  /**
   * Handles form submission
   * Transforms form data and triggers API mutation
   */
  const handleFormSubmit = async (data: ProfileFormData) => {
    const apiPayload = transformProfileDataForAPI(data)
    profileMutation.mutate(apiPayload)
  }

  /**
   * Toggles edit mode or submits form based on current state
   */
  const handleUpdateClick = () => {
    if (isEditing) {
      form.handleSubmit(handleFormSubmit)()
    } else {
      setIsEditing(true)
    }
  }

  // Shared props for both layouts
  const sharedProps = {
    form,
    isEditing,
    isSubmitting: profileMutation.isPending,
    onEditToggle: () => setIsEditing(true),
    onUpdateClick: handleUpdateClick,
    profileData,
  }

  return (
    <>
      
      <div className="hidden lg:block">
        <ProfileDesktopLayout {...sharedProps} />
      </div>

    
      <div className="lg:hidden">
        <ProfileMobileLayout {...sharedProps} />
      </div>
    </>
  )
}
