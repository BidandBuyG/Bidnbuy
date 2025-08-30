import { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { ArrowLeft, Edit2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";

import {
  completeProfileSchema,
  type CompleteProfileFormData,
} from "./lib/complete-profile-schema";

import AmeliaProfileImage from "@/assets/user/amelia-profile-image.jpg"
import type { CompleteProfileFormProps } from "./types/complete-profile";
import { useCompleteProfile } from "./hooks/useCompleteProfile";

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

  // API call with JWT token for complete profile
  const onSubmit = async (data: CompleteProfileFormData) => {
    console.log("Form submitted with:", data);
    
    

    // try {
    //   // Transform data to match API payload
    //   const payload = {
    //     fullName: data.fullName,
    //     phoneNumber: data.phoneNumber,
    //     email: data.email,
    //     dateOfBirth: data.dateOfBirth.replace(/\//g, "-"), // Convert to DD-MM-YYYY
    //     bvn: data.bvn,
    //     nin: data.nin || undefined,
    //     address: data.address,
    //   };

    //   const response = await axiosInstance.patch(
    //     "/api/v1/auth/update-profile",
    //     payload,
    //     { withCredentials: true }
    //   );

    //   if (response.status === 200) {
    //     toast.success("Profile updated and wallet created successfully");
    //     setIsEditing(false);
    //     // Optionally redirect to dashboard
    //     // router.push("/dashboard")
    //   }
    // } catch (error: any) {
    //   console.log("Error completing profile:", error);

    //   const errorMessage =
    //     error.response?.data?.message ||
    //     error.response?.data?.error ||
    //     error.message ||
    //     "Failed to update profile. Please try again.";

    //   toast.error(errorMessage);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  // const handleUpdate = () => {
  //     if (isEditing) {
  //       handleSubmit(onSubmit)()
  //     } else {
  //       setIsEditing(true)
  //     }
  //   }

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

        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src={AmeliaProfileImage}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Sophia Clark</h2>
          <p className="text-gray-300 mb-1">@sophie.clark</p>
          <p className="text-gray-400 text-sm">Joined 2021</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Account Information */}
          <div className="backdrop-blur-sm rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-6">Account</h3>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-gray-300 text-sm mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("fullName")}
                        type="text"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white">{watchedData.fullName}</p>
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

              {/* Phone Number */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-gray-300 text-sm mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("phoneNumber")}
                        type="tel"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.phoneNumber && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white">{watchedData.phoneNumber}</p>
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

              {/* Email Address */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-gray-300 text-sm mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white">{watchedData.email}</p>
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

              {/* Date of Birth */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-gray-300 text-sm mb-1">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("dateOfBirth")}
                        type="text"
                        placeholder="DD/MM/YYYY"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.dateOfBirth && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white">{watchedData.dateOfBirth}</p>
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

              {/* BVN - Only show in editing mode */}

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
                  NIN (Optional)
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
                disabled={form.formState.isSubmitting}
                className="w-full font-medium py-3 px-6 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#00707B" }}
              >
                {form.formState.isSubmitting
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
