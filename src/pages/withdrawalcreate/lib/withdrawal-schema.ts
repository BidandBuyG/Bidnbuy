import { z } from "zod"

export const withdrawalSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Amount must be a positive number")
    .refine((val) => Number(val) >= 100, "Minimum withdrawal amount is ₦100")
    .refine((val) => Number(val) <= 1000000, "Maximum withdrawal amount is ₦1,000,000"),
  bank: z.string().min(1, "Please select a bank"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits")
    .max(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),
})

export type WithdrawalFormData = z.infer<typeof withdrawalSchema>
