import type React from "react"

import type { UseFormSetValue, FieldErrors } from "react-hook-form"
import { CustomNumberInput } from "./CustomNumberInput"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { BidFormData } from "../schema/bid-schema"

type BidFormContentProps = {
  bidAmount: number
  agreedToTerms: boolean
  errors: FieldErrors<BidFormData>
  displayErrorMessage: string | null
  canBid: boolean
  isProcessing: boolean
  auctionEnded: boolean
  isValid: boolean
  setValue: UseFormSetValue<BidFormData>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export function BidFormContent({
  bidAmount,
  agreedToTerms,
  errors,
  displayErrorMessage,
  canBid,
  isProcessing,
  auctionEnded,
  isValid,
  setValue,
  onSubmit,
}: BidFormContentProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-white font-medium mb-2">Place Your Bid</label>
        <CustomNumberInput
          value={bidAmount === 0 ? "" : bidAmount}
          onChange={(value) => setValue("bidAmount", value === "" ? 0 : value, { shouldValidate: true })}
          placeholder="Enter bid amount"
          // min={auction.minimumBid} // This prop should ideally come from auction data passed down
          disabled={!canBid || isProcessing || auctionEnded}
          error={!!errors.bidAmount}
        />
        {errors.bidAmount && <p className="text-red-400 text-sm mt-1">{errors.bidAmount.message}</p>}
      </div>

     
      {displayErrorMessage && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          {displayErrorMessage}
        </div>
      )}

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setValue("agreedToTerms", checked as boolean, { shouldValidate: true })}
          className="border-slate-600 data-[state=checked]:bg-teal-600"
          disabled={!canBid || auctionEnded}
        />
        <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
          I confirm that I have read and agree to the terms and conditions of this bid.
        </label>
      </div>
      {errors.agreedToTerms && <p className="text-red-400 text-sm">{errors.agreedToTerms.message}</p>}

      <Button
        type="submit"
        disabled={!isValid || !canBid || isProcessing || auctionEnded}
        className="w-full bg-teal-600 hover:bg-teal-700 py-3 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Submit Bid"}
      </Button>
    </form>
  )
}
