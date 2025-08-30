import { useAuthStore } from "@/store/auth";

import CompleteProfileForm from "@/features/complete-profile/CompleteProfileForm";

const CompleteProfile = () => {
  const { user } = useAuthStore();

  const initialUserData = {
    fullName: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <CompleteProfileForm initialData={initialUserData} />
    </div>
  );
};

export default CompleteProfile;
