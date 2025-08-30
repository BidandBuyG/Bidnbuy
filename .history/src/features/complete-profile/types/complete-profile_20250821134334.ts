export type CompleteProfileFormProps = {
  initialData?: Partial<CompleteProfilePayload>;
  onSuccessRedirect?: (path: string) => void;
};

export type CompleteProfilePayload = {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  bvn: string;
  nin: string;
  address: string;
}
