/**
 * @file lib/validation/reward-settings-schema.ts
 * @description Zod validation schema for reward settings form.
 */

import { z } from "zod"

/**
 * Zod schema for reward settings form validation.
 */
export const rewardSettingsSchema = z
  .object({
    rewardsEnabled: z.boolean(),
    cashbackPercentage: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true // Allow empty
          const num = Number.parseFloat(val)
          return !isNaN(num) && num >= 0 && num <= 100
        },
        {
          message: "Cashback percentage must be between 0 and 100",
        },
      ),
    streakCaps: z.string().optional(),
    platformPercentage: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true // Allow empty
          const num = Number.parseFloat(val)
          return !isNaN(num) && num >= 0 && num <= 100
        },
        {
          message: "Platform percentage must be between 0 and 100",
        },
      ),
    sellerPercentage: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true // Allow empty
          const num = Number.parseFloat(val)
          return !isNaN(num) && num >= 0 && num <= 100
        },
        {
          message: "Seller percentage must be between 0 and 100",
        },
      ),
    conversionRate: z.string().optional(),
    minimumBidCredit: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true // Allow empty
          const num = Number.parseInt(val)
          return !isNaN(num) && num >= 0
        },
        {
          message: "Minimum BidCredit must be a positive number",
        },
      ),
    maximumBidCredit: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true // Allow empty
          const num = Number.parseInt(val)
          return !isNaN(num) && num >= 0
        },
        {
          message: "Maximum BidCredit must be a positive number",
        },
      ),
    listingFee: z.string().refine(
      (val) => {
        const num = Number.parseInt(val)
        return !isNaN(num) && num >= 0
      },
      {
        message: "Listing fee must be a positive number",
      },
    ),
  })
  .refine(
    (data) => {
      // Custom validation: platform + seller percentages should not exceed 100%
      const platform = Number.parseFloat(data.platformPercentage || "0")
      const seller = Number.parseFloat(data.sellerPercentage || "0")
      if (data.platformPercentage && data.sellerPercentage) {
        return platform + seller <= 100
      }
      return true
    },
    {
      message: "Platform and Seller percentages combined cannot exceed 100%",
      path: ["sellerPercentage"], // Show error on seller percentage field
    },
  )
  .refine(
    (data) => {
      // Custom validation: minimum should be less than maximum
      const min = Number.parseInt(data.minimumBidCredit || "0")
      const max = Number.parseInt(data.maximumBidCredit || "0")
      if (data.minimumBidCredit && data.maximumBidCredit) {
        return min <= max
      }
      return true
    },
    {
      message: "Minimum BidCredit cannot be greater than Maximum BidCredit",
      path: ["maximumBidCredit"], // Show error on maximum field
    },
  )

/**
 * Type inference from the Zod schema.
 */
export type RewardSettingsFormData = z.infer<typeof rewardSettingsSchema>
