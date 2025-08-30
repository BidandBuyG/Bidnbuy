import { z } from 'zod';

export const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters.").max(100, "Full Name cannot exceed 100 characters."),
  phoneNumber: z.string().regex(/^0[789][01]\d{8}$/, "Invalid Nigerian phone number format (e.g., 08012345678)."),
  email: z.string().email("Invalid email address."),
  dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date of Birth must be in DD-MM-YYYY format."),
  bvn: z.string().length(11, "BVN must be exactly 11 digits."),
  nin: z.string().length(11, "NIN must be exactly 11 digits."),
  address: z.string().min(5, "Address must be at least 5 characters.").max(250, "Address cannot exceed 250 characters."),
});

export type LoginFormValues = z.infer<typeof formSchema>;