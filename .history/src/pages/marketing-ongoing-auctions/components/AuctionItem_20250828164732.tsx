import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { PromoteAuctionModal } from "./promote-auction-modal"

type AuctionItemProps = {
  id: string
  title: string
  image: string
  currentBid: string
  timeLeft: string
  onJoinBid: (id: string) => void
}

export function AuctionItem({ id, title, image, currentBid, timeLeft, onJoinBid }: AuctionItemProps) {
  const [showPromoteModal, setShowPromoteModal] = useState(false)

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm md:text-base mb-1 truncate">{title}</h3>
            <p className="text-slate-300 text-xs md:text-sm mb-1">
              Current Bid: <span className="text-teal-400 font-medium">{currentBid}</span>
            </p>
            <p className="text-slate-400 text-xs">Time Left: {timeLeft}</p>
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
