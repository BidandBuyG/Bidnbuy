import { useState } from "react";

import { useForm } from "react-hook-form";

import { ArrowLeft, Edit2 } from "lucide-react";

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


              <EditableField
              label="Email Address"
              value={watchedData.email}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("email")}
              error={errors.email}
              type="email"
            />

            <EditableField
              label="Date of Birth"
              value={watchedData.dateOfBirth}
              isEditing={isEditing}
              toggleEdit={() => setIsEditing(true)}
              register={register("dateOfBirth")}
              error={errors.dateOfBirth}
            />

              {/* Location/Address */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-gray-300 text-sm mb-1">
                    Location/Address
                  </label>
                  {isEditing ? (
                    <div>
                      <textarea
                        {...register("address")}
                        rows={2}
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400 resize-none"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white">{watchedData.address}</p>
                  )}
                </div>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="ml-4 text-gray-400 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  BVN (Bank Verification Number)
                </label>
                <input
                  {...register("bvn")}
                  type="text"
                  placeholder="Enter your 11-digit BVN"
                  maxLength={11}
                  style={{ backgroundColor: "#00707B4D" }}
                  className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                />
                {errors.bvn && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.bvn.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  NIN (National Identification Number)
                </label>
                <input
                  {...register("nin")}
                  type="text"
                  placeholder="Enter your 11-digit NIN"
                  maxLength={11}
                  style={{ backgroundColor: "#00707B4D" }}
                  className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                />
                {errors.nin && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.nin.message}
                  </p>
                )}
              </div>
            </div>
          </div>

       
          <div className="backdrop-blur-sm rounded-lg p-6">
        
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isValid || completeProfileMutation.isPending}
                className="w-full font-medium py-3 px-6 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#00707B" }}
              >
                {completeProfileMutation.isPending
                  ? "Updating..."
                  : "Complete Profile & Create Wallet"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCompleteProfile;
