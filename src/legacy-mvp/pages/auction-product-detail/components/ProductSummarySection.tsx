import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { AuctionData, TimeLeft } from "@/store/auction-store"

import { CountdownTimer } from "@/components/countdown-timer/CountdownTimer"
import type { Product } from "@/store/products"
import PlaceBidIcon from "@/components/svg-icons/PlaceBidIcon"

type ProductSummarySectionProps = {
  product: Product
  auction: AuctionData
  timeLeft: TimeLeft
  isAuctionEnded: boolean
  canPlaceBid: boolean
  onPlaceBidClick: () => void
}

export function ProductSummarySection({
  product,
  auction,
  timeLeft,
  isAuctionEnded,
  canPlaceBid,
  onPlaceBidClick,
}: ProductSummarySectionProps) {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-white">{product.itemName || "Hermes Birkin Bag"}</h1>
      <div className="text-2xl lg:text-3xl font-bold mb-6text-[#39F0BC]">
        ₦{product.basePrice?.toLocaleString() || "200,000"}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-400 mb-1">Current Bid:</div>
          <div className="text-lg lg:text-xl font-bold text-[#39F0BC]">
            ₦{auction.currentBid.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Minimum Bid:</div>
          <div className="text-lg lg:text-xl font-bold text-[#39F0BC]">
            ₦{auction.minimumBid.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <CountdownTimer timeLeft={timeLeft} isAuctionEnded={isAuctionEnded} />
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-300 mb-3">Condition: New</div>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-teal-600 text-sm font-semibold">G</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-white">Ginaluxury</div>
            <div className="text-xs text-gray-400">Vendor</div>
          </div>
        </div>
      </div>

    
      <div className="flex gap-3 mb-8">
        <Button
          onClick={onPlaceBidClick}
          disabled={!canPlaceBid}
          className="flex-1 bg-[#F4A300] hover:hover:bg-[#2CD0A5] text-white font-semibold py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlaceBidIcon className="w-4 h-4 mr-2" />
          Place Bid
        </Button>
        <Button
          variant="outline"
          className="flex-1 font-semibold py-3 text-white bg-transparent border-[#DC4822] hover:bg-[#DC4822]/10"
          
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
        <Button
          variant="outline"
          className="px-4 font-semibold py-3 text-white bg-transparent hover:bg-[#00545F]/10"
          style={{ borderColor: "#00545F" }}
        >
          Add to Wishlist
        </Button>
      </div>

      {/* Current Views */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-slate-600/30">
        <div className="text-sm text-gray-300 mb-1">
          Current views: <span className="text-teal-400 font-semibold">30 people</span> are watching this.
        </div>
        <div className="text-sm text-gray-300">
          Hermes birkin bag is trending, <span className="text-orange-400 font-semibold">25 sold</span> out already
        </div>
      </div>
    </div>
  )
}
