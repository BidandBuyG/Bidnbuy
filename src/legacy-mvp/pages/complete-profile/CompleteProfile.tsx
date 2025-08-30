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
    <>
      <CompleteProfileForm initialData={initialUserData} />
    </>
  );
};

export default CompleteProfile;
