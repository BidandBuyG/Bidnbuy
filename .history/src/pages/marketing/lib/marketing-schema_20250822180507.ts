import { z } from "zod"

export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  emailAddress: z.string().email("Please enter a valid email address"),
  category: z.enum(["buyer", "vendor"], {
    required_error: "Please select a category",
  }),
})

export type RegisterUserFormData = z.infer<typeof registerUserSchema>

export const referralFilterSchema = z.object({
  search: z.string().optional(),
  sort: z.enum(["name", "date", "status"]).optional(),
  filter: z.enum(["all", "buyer", "vendor", "rewarded", "pending"]).optional(),
})

export type ReferralFilterData = z.infer<typeof referralFilterSchema>
