import * as z from "zod"

export const completeProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  bvn: z
    .string()
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d{11}$/, "BVN must contain only digits"),
  nin: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 11, {
      message: "NIN must be exactly 11 digits",
    }),
})

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>