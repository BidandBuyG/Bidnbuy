import { CompleteProfileForm } from '@/components/CompleteProfileForm';
import { useNavigate } from 'react-router-dom';

export function CompleteProfileScreen() {
  const navigate = useNavigate(); 

  const handleRedirect = (path: string) => {
    navigate(path);
    alert(`Redirecting to: ${path}`); 

  // Simulate initial user data (e.g., fetched from an API or global state)
  const initialUserData = {
    fullName: "Kelechi Okoro", // Pre-filled and editable if not set by user
    phoneNumber: "08012345678", // Read-only if verified
    email: "kelechi.okoro@example.com", // Read-only if verified
    // Other fields would typically be empty if not yet completed
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
