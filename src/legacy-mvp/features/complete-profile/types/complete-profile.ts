import type { CompleteProfileFormData } from "../lib/complete-profile-schema";

export type CompleteProfileFormProps = {
  initialData?: Partial<CompleteProfileFormData>;
  onSuccessRedirect?: (path: string) => void;
};


