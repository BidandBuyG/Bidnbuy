import { useState } from "react";

import { useForm } from "react-hook-form";

import { ArrowLeft } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  completeProfileSchema,
  type CompleteProfileFormData,
} from "./lib/complete-profile-schema";

import AmeliaProfileImage from "@/assets/user/amelia-profile-image.jpg"
import type { CompleteProfileFormProps } from "./types/complete-profile";
import { useCompleteProfile } from "./hooks/useCompleteProfile";
import ProfileHeader from "./components/ProfileHeader";
import EditableProfileFormField from "@/components/forms/EditableProfileFormField";
import StaticProfileFormField from "@/components/forms/StaticProfileFormField";
import FormSubmitButton from "./components/ProfileFormSubmitButton";


const NewCompleteProfile = ({ initialData }: CompleteProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: initialData?.fullName || "Sophia Clark",
      phoneNumber: initialData?.phoneNumber || "+2348153133879",
      email: initialData?.email || "sophiaclark@gmail.com",
      dateOfBirth: initialData?.dateOfBirth || "1/05/2000",
      address: initialData?.address || "No 6 main road, Lagos, Nigeria",
      bvn: initialData?.bvn || "",
      nin: initialData?.nin || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = form;

  const watchedData = watch();

  const completeProfileMutation = useCompleteProfile();

  const onSubmit = async (data: CompleteProfileFormData) => {
    console.log("Form submitted with:", data);
    
    completeProfileMutation.mutate(data);
    
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
      {/* Mobile Back Button */}
      <div className="lg:hidden flex items-center px-4 py-3 border-b border-teal-700/30">
        <ArrowLeft className="w-6 h-6 text-white mr-3" />
        <span className="text-white text-lg font-medium">Profile</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
        {/* Page Title - Desktop Only */}
        <h1 className="hidden lg:block text-3xl font-bold text-white mb-8">
          Customer KYC
        </h1>


        <ProfileHeader 
          name="Sophia Clark"
          username="sophie.clark"
          joinedDate="2021"
          imageUrl={AmeliaProfileImage}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Account Information */}
          <div className="backdrop-blur-sm rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-6">Account</h3>

            <div className="space-y-6">
              {/* Full Name */}
              <EditableProfileFormField
              label="Full Name"
              value={watchedData.fullName}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("fullName")}
              error={errors.fullName}
            />

              
              <EditableProfileFormField
              label="Phone Number"
              value={watchedData.phoneNumber}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("phoneNumber")}
              error={errors.phoneNumber}
              type="tel"
            />


              <EditableProfileFormField
              label="Email Address"
              value={watchedData.email}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("email")}
              error={errors.email}
              type="email"
            />

            <EditableProfileFormField
              label="Date of Birth"
              value={watchedData.dateOfBirth}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("dateOfBirth")}
              error={errors.dateOfBirth}
            />

            

              

<EditableProfileFormField
              label="Location/Address"
              value={watchedData.address}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("address")}
              error={errors.address}
              textarea
            />

            <StaticProfileFormField
              label="BVN (Bank Verification Number)"
              register={register("bvn")}
              error={errors.bvn}
              maxLength={11}
              placeholder="Enter your 11-digit BVN"
            />
            <StaticProfileFormField
              label="NIN (National Identification Number)"
              register={register("nin")}
              error={errors.nin}
              maxLength={11}
              placeholder="Enter your 11-digit NIN"
            />






            </div>
          </div>

       
          <div className="backdrop-blur-sm rounded-lg p-6">
        
            <div className="mt-8">
              
              <FormSubmitButton
              isSubmitting={completeProfileMutation.isPending}
              disabled={!isValid}
              label="Complete Profile & Create Wallet"
            />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCompleteProfile;
