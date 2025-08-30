import { useNavigate } from 'react-router-dom';

import { CompleteProfileForm } from '@/features/complete-profile/CompleteProfileForm';

const CompleteProfile = () => {
  const navigate = useNavigate(); 

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
    
    <div className="flex min-h-screen items-center justify-center bg-grey-100 p-4 dark:bg-gray-950">
      <CompleteProfileForm
        initialData={initialUserData}
        onSuccessRedirect={handleRedirect}
      />
    </div>
  );
}

export default CompleteProfile;
