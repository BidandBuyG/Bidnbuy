

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
    fullName: use?., 
    phoneNumber: "08012345678", 
    email: "kelechi.okoro@example.com",
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
