import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
import { ArrowLeft, Edit2, User, ShoppingCart, HelpCircle, Menu, Bell } from "lucide-react"
import axios from "axios"
import * as z from "zod"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "@/lib/axios"

// Enhanced form validation schema with exact requirements
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  idType: z.string().min(1, "Please select an ID type"),
  idNumber: z.string().min(1, "ID number is required"),
  bvn: z
    .string()
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d{11}$/, "BVN must contain only digits"),
  nin: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 11, {
      message: "NIN must be exactly 11 digits",
    }),
})

type ProfileFormData = z.infer<typeof formSchema>

// Toast notification hook
const useToast = () => {
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      alert(`✅ ${message}`)
    } else {
      alert(`❌ ${message}`)
    }
  }
  return { toast: showToast }
}

const NewCompleteProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", 
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "Sophia Clark",
      phoneNumber: "+2348153133879",
      email: "sophiaclark@gmail.com",
      dateOfBirth: "1/05/2000",
      address: "No 6 main road, Lagos, Nigeria",
      idType: "NIN",
      idNumber: "1002358732",
      bvn: "",
      nin: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = form

  const watchedData = watch()

  // API call with JWT token for complete profile
  const onSubmit = async (data: ProfileFormData) => {
    console.log("Form submitted with:", data)
    setIsSubmitting(true)

    try {
      // const response = await axiosInstance.get("/api/get-user", { withCredentials: true });
      // console.log(response.data)
      // Get JWT token from localStorage or your auth context
      // const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

      // if (!token) {
      //   toast("Authentication token not found. Please login again.", "error")
      //   navigate("/login/customer")
      //   return
      // }

      // Transform data to match API payload
      const payload = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        dateOfBirth: data.dateOfBirth.replace(/\//g, "-"), // Convert to DD-MM-YYYY
        bvn: data.bvn,
        nin: data.nin || undefined,
        address: data.address,
      }

      const response = await axiosInstance.post("/api/v1/auth/update-profile", payload)

      if (response.status === 200) {
        toast("Profile updated and wallet created successfully", "success")
        setIsEditing(false)
        // Optionally redirect to dashboard
        // router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Error completing profile:", error)

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update profile. Please try again."

      toast(errorMessage, "error")
    } finally {
      setIsSubmitting(false)
    }
  }

// const handleUpdate = () => {
//     if (isEditing) {
//       handleSubmit(onSubmit)()
//     } else {
//       setIsEditing(true)
//     }
//   }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
      {/* Desktop Header */}
      <header className="hidden lg:block bg-teal-800/50 backdrop-blur-sm border-b border-teal-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-white text-xl font-semibold">BidnBuy</span>
              </Link>
              <Link
                to="/sell"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-sm">🏷️</span>
                <span>Sell on BidnBuy</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/account"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </Link>
              <Link
                to="/help"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help & Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-teal-800/50 backdrop-blur-sm border-b border-teal-700/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Menu className="w-6 h-6 text-white" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-white" />
            <ShoppingCart className="w-6 h-6 text-white" />
            <Bell className="w-6 h-6 text-white" />
          </div>
        </div>
      </header>

      {/* Mobile Back Button */}
      <div className="lg:hidden flex items-center px-4 py-3 border-b border-teal-700/30">
        <ArrowLeft className="w-6 h-6 text-white mr-3" />
        <span className="text-white text-lg font-medium">Profile</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
        {/* Page Title - Desktop Only */}
        <h1 className="hidden lg:block text-3xl font-bold text-white mb-8">Customer KYC</h1>

        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src="/images/profile-woman.png"
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
          <div className="bg-teal-800/30 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-6">Account</h3>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("fullName")}
                        type="text"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.fullName && <p className="text-sm text-red-400 mt-1">{errors.fullName.message}</p>}
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
                  <label className="block text-gray-300 text-sm mb-1">Phone Number</label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("phoneNumber")}
                        type="tel"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.phoneNumber && <p className="text-sm text-red-400 mt-1">{errors.phoneNumber.message}</p>}
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
                  <label className="block text-gray-300 text-sm mb-1">Email Address</label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
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
                  <label className="block text-gray-300 text-sm mb-1">Date of Birth</label>
                  {isEditing ? (
                    <div>
                      <input
                        {...register("dateOfBirth")}
                        type="text"
                        placeholder="DD/MM/YYYY"
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                      />
                      {errors.dateOfBirth && <p className="text-sm text-red-400 mt-1">{errors.dateOfBirth.message}</p>}
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
                  <label className="block text-gray-300 text-sm mb-1">Location/Address</label>
                  {isEditing ? (
                    <div>
                      <textarea
                        {...register("address")}
                        rows={2}
                        style={{ backgroundColor: "#00707B4D" }}
                        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400 resize-none"
                      />
                      {errors.address && <p className="text-sm text-red-400 mt-1">{errors.address.message}</p>}
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
              {isEditing && (
                <div>
                  <label className="block text-gray-300 text-sm mb-1">BVN (Bank Verification Number)</label>
                  <input
                    {...register("bvn")}
                    type="text"
                    placeholder="Enter your 11-digit BVN"
                    maxLength={11}
                    style={{ backgroundColor: "#00707B4D" }}
                    className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                  />
                  {errors.bvn && <p className="text-sm text-red-400 mt-1">{errors.bvn.message}</p>}
                </div>
              )}

              {/* NIN - Only show in editing mode */}
              {isEditing && (
                <div>
                  <label className="block text-gray-300 text-sm mb-1">NIN (Optional)</label>
                  <input
                    {...register("nin")}
                    type="text"
                    placeholder="Enter your 11-digit NIN"
                    maxLength={11}
                    style={{ backgroundColor: "#00707B4D" }}
                    className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                  />
                  {errors.nin && <p className="text-sm text-red-400 mt-1">{errors.nin.message}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Valid ID Section */}
          <div className="bg-teal-800/30 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Valid ID</h3>

            <div className="space-y-6">
              {/* Select ID Type */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Select ID Type</label>
                {isEditing ? (
                  <div>
                    <select
                      {...register("idType")}
                      style={{ backgroundColor: "#00707B4D" }}
                      className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                    >
                      <option value="NIN">NIN</option>
                      <option value="BVN">BVN</option>
                      <option value="Passport">International Passport</option>
                      <option value="License">Driver's License</option>
                    </select>
                    {errors.idType && <p className="text-sm text-red-400 mt-1">{errors.idType.message}</p>}
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: "#00707B4D" }}
                    className="text-white px-3 py-2 rounded-md border border-teal-600"
                  >
                    {watchedData.idType}
                  </div>
                )}
              </div>

              {/* ID Number */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">ID Number</label>
                {isEditing ? (
                  <div>
                    <input
                      {...register("idNumber")}
                      type="text"
                      style={{ backgroundColor: "#00707B4D" }}
                      className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
                    />
                    {errors.idNumber && <p className="text-sm text-red-400 mt-1">{errors.idNumber.message}</p>}
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: "#00707B4D" }}
                    className="text-white px-3 py-2 rounded-md border border-teal-600"
                  >
                    {watchedData.idNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-8">
  <button
  type="submit"
  disabled={!form.formState.isValid || form.formState.isSubmitting}
  className="w-full font-medium py-3 px-6 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
  style={{ backgroundColor: "#00707B" }}
>
  {form.formState.isSubmitting ? "Updating..." : "Complete Profile & Create Wallet"}
</button>

</div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default NewCompleteProfile;
