

import { CompleteProfileForm } from '@/features/complete-profile/CompleteProfileForm';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate(); 
  const { }

  const handleRedirect = (path: string) => {
    navigate(path);
    alert(`Redirecting to: ${path}`); 
  };


  const initialUserData = {
    fullName: "Kelechi Okoro", 
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
