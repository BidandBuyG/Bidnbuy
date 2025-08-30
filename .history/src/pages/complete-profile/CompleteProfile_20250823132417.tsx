

import CompleteProfileForm from '@/features/complete-profile/NewCompleteProfile';
import { useAuthStore } from '@/store/auth';



const CompleteProfile = () => {
  const { user } = useAuthStore();


  return (
    
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <CompleteProfileForm
      />
    </div>
  );
}

export default CompleteProfile;
