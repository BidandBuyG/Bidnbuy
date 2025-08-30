import { CountdownTimer } from "@/components/countdown-timer/CountdownTimer"
import { BidFormContent } from "./BidFormContent"
import React from "react"

type PlaceBidModalContentProps = {
  auction: any
  timeLeft: any
  auctionEnded: boolean
  canBid: boolean
  isProcessing: boolean
  isValid: boolean
  isError?: boolean
  isSuccess?: boolean
  bidAmount: number
  agreedToTerms: boolean
  errors: Record<string, any>
  displayErrorMessage?: string | null
  setValue: (...args: any[]) => void
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export function PlaceBidModalContent({
  auction,
  timeLeft,
  auctionEnded,
  canBid,
  isProcessing,
  isValid,
  bidAmount,
  agreedToTerms,
  errors,
  displayErrorMessage,
  setValue,
  onSubmit,
}: PlaceBidModalContentProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-gray-400 text-sm">Current Bid:</span>
            <div className="text-xl font-bold text-[#39F0BC]">
              ₦{auction.currentBid?.toLocaleString?.() ?? "180,000"}
            </div>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Minimum Bid:</span>
            <div className="text-xl font-bold text-[#39F0BC]">
              ₦{auction.minimumBid?.toLocaleString?.() ?? "150,000"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <CountdownTimer timeLeft={timeLeft} isAuctionEnded={auctionEnded} />
        </div>

        {auction.status === "live" && (
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live Auction</span>
          </div>
        )}
      </div>

      <BidFormContent
        bidAmount={bidAmount}
        agreedToTerms={agreedToTerms}
        errors={errors}
        displayErrorMessage={displayErrorMessage ?? null}
        canBid={canBid}
        isProcessing={isProcessing}
        auctionEnded={auctionEnded}
        isValid={isValid}
        setValue={setValue}
        onSubmit={onSubmit}
      />
    </>
  )
}
