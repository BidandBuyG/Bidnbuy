import { z } from "zod"

export const bidSchema = z.object({
  bidAmount: z
    .number({
      required_error: "Bid amount is required",
      invalid_type_error: "Bid amount must be a number",
    })
    .min(1, "Bid amount must be greater than 0")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid bid amount",
    })
    .transform((val) => Number(val)), // This transform is now safe as CustomNumberInput passes unformatted string
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export type BidFormData = z.infer<typeof bidSchema>

export const createBidValidation = (currentBid: number, minimumBid: number) => {
  return bidSchema.extend({
    bidAmount: z
      .number({
        required_error: "Bid amount is required",
        invalid_type_error: "Bid amount must be a number",
      })
      .min(minimumBid, `Minimum bid is ₦${minimumBid.toLocaleString()}`)
      .gt(currentBid, `Your bid must be higher than the current bid of ₦${currentBid.toLocaleString()}`),
  })
}

