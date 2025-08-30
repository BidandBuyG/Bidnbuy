
import { ChevronLeft, Heart } from "lucide-react"

import type { PlaceBidModalProps } from "../types/place-bid-modal"

import { ConnectionStatus } from "@/components/connection-status/ConnectionStatus"
import { BidStatusOverlay } from "../components/BidStatusOverlay"
import { PlaceBidModalContent } from "./PlaceBidModalContent"

import HermesBagImage from "@/assets/products/hermes-bag.png"
import BidnBuyLogo from "@/assets/bidnbuy-logo.png"

export function MobilePlaceBidModal({
  isOpen,
  auction,
  timeLeft,
  canBid,
  auctionEnded,
  isProcessing,
  isSuccess,
  displayErrorMessage = null,
  bidAmount,
  agreedToTerms,
  errors,
  isValid,
  setValue,
  onSubmit,
  handleClose,
}: PlaceBidModalProps) {
  if (!isOpen) return null
  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-[#01151C]">
      <div className="flex flex-col h-full">
      
        <header className="bg-[#00545F] px-4 py-3 flex items-center justify-between">
          <button onClick={handleClose} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img src={BidnBuyLogo} alt="BidnBuy Logo" width={40} height={40} className="ml-8 object-contain" />
          <ConnectionStatus productId={auction.id} className="scale-75" />
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          
          <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl p-6 mb-6 backdrop-blur-sm border border-slate-700/30">
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-slate-600/30">
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <span className="text-sm font-medium">200</span>
            </div>
            <div className="flex justify-center">
              <img
                src={HermesBagImage}
                alt="Hermes Birkin Bag"
                width={280}
                height={280}
                className="object-contain"
              />
            </div>
            <div className="flex justify-center mt-4 gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>

  
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-3 text-white">{auction.title}</h1>
            <div className="text-2xl font-bold mb-4 text-[#39F0BC]">
              ₦{auction.basePrice?.toLocaleString?.() ?? "200,000"}
            </div>

            <PlaceBidModalContent
              auction={auction}
              timeLeft={timeLeft}
              auctionEnded={auctionEnded}
              canBid={canBid}
              isProcessing={isProcessing}
              isValid={isValid}
              bidAmount={bidAmount}
              agreedToTerms={agreedToTerms}
              errors={errors}
              displayErrorMessage={displayErrorMessage}
              setValue={setValue}
              onSubmit={onSubmit}
            />


            
          </div>
        </div>

        <BidStatusOverlay isProcessing={isProcessing} isSuccess={isSuccess} onClose={handleClose} isMobile />
      </div>
    </div>
  )
}
