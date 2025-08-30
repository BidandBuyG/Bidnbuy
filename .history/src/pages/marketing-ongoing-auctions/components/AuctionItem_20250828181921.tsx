import { useState } from "react"

import { Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import PromoteAuctionModal from "./PromoteAuctionModal"


type AuctionItemProps = {
  id: string
  title: string
  image: string
  currentBid: string
  timeLeft: Date
  onJoinBid: (id: string) => void
}

export function AuctionItem({ id, title, image, currentBid, timeLeft, onJoinBid }: AuctionItemProps) {
  const [showPromoteModal, setShowPromoteModal] = useState(false)

  return (
    <>
      <Card key={auction.id} className="p-4 bg-[#00222E] border-[#00707B]"">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm md:text-base mb-1 truncate">{title}</h3>
            <p className="text-slate-300 text-xs md:text-sm mb-1">
              Current Bid: <span className="text-teal-400 font-medium">{currentBid}</span>
            </p>
            <p className="text-slate-400 text-xs">Time Left: {timeLeft.toLocaleTimeString()}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button
              size="sm"
              onClick={() => setShowPromoteModal(true)}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs px-3 py-1.5 h-auto"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
            <Button
              size="sm"
              onClick={() => onJoinBid(id)}
              className="bg-teal-700 hover:bg-teal-600 text-white text-xs px-3 py-1.5 h-auto border border-teal-600"
            >
              Join Bid
            </Button>
          </div>
        </div>
      </div>

      <PromoteAuctionModal
        open={showPromoteModal}
        onOpenChange={setShowPromoteModal}
        auctionId={id}
        auctionTitle={title}
      />
    </>
  )
}
