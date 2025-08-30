import { X, Heart } from "lucide-react";

import type { PlaceBidModalProps } from "../types/place-bid-modal";

import { ConnectionStatus } from "@/components/connection-status/ConnectionStatus";
import { BidStatusOverlay } from "../components/BidStatusOverlay";
import { PlaceBidModalContent } from "./PlaceBidModalContent";

import HermesBagImage from "@/assets/products/hermes-bag.png";

export function DesktopPlaceBidModal({
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
  if (!isOpen) return null;
  return (
    <div
      className="hidden lg:block fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={handleClose}
    >
      <div
        className="flex items-center justify-center min-h-screen p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div
          className="bg-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/30"
          style={{ backgroundColor: "#01151C" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Place Bid</h2>
            <div className="flex items-center gap-4">
              <ConnectionStatus productId={auction.id} />
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/30">
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-slate-600/30">
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                  <span className="text-sm font-medium">200</span>
                </div>
                <div className="flex justify-center">
                  <img
                    src={HermesBagImage}
                    alt="Hermes Birkin Bag"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div>
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

          <BidStatusOverlay
            isProcessing={isProcessing}
            isSuccess={isSuccess}
            onClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
