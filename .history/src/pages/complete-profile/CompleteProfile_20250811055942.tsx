

import { CompleteProfileForm } from '@/features/complete-profile/CompleteProfileForm';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate(); 
  const { user } = useAuthStore();

  const handleRedirect = (path: string) => {
    navigate(path);
    alert(`Redirecting to: ${path}`); 
  };


  const initialUserData = {
    fullName: user?.name, 
    phoneNumber: user?.phoneNumber || "", 
    email: user?.email || "",
  };

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <CompleteProfileForm
        initialData={initialUserData}
        onSuccessRedirect={handleRedirect}
      />
    </div>
  );
}

export default CompleteProfile;
