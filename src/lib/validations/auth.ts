import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    // phoneNumber: z
    //   .string()
    //   .min(11, "Phone number must be at least 11 characters"),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, { message: "You must agree to the terms" }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine(
    (data) => {
      const hasConfirm =
        typeof data.confirmPassword === "string" &&
        data.confirmPassword.length > 0;
      return !hasConfirm || data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

export const signupMarketingSchema = z.object({
  firstName: z.string().min(2, "Minimum of 2 characters is required"),
  lastName: z.string().min(2, "Minimum of 2 characters is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().optional(),
  address: z.string().min(3, "Address must be at least 3 characters"),
  // .optional()
  state: z.string().min(2, "State must be at least 2 characters"),
  // .optional(),
  nin: z.string().min(11, "NIN must be at least 11 characters"),
  // .optional(),
  document: z.instanceof(File).optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export const passwordOtpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const changepasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    token: z.string().min(1, "Token is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type SignupMarketingFormValues = z.infer<typeof signupMarketingSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type PasswordOtpFormValues = z.infer<typeof passwordOtpSchema>;
export type ChangePasswordFormValues = z.infer<typeof changepasswordSchema>;
