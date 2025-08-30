import { format } from "date-fns"

import type { BidHistoryItem } from "@/store/auction-store"

import { Button } from "@/components/ui/button"


type BidHistorySectionProps = {
  bidHistory: BidHistoryItem[]
  currentHighestBid: number
}

export function BidHistorySection({ bidHistory, currentHighestBid }: BidHistorySectionProps) {
  
// Safely sort bid history by timestamp descending (most recent first)
  const sortedBidHistory = [...bidHistory].sort((a, b) => {
    const timestampA = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime()
    const timestampB = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime()
    return timestampB - timestampA
  })

  const currentHighestBidder = sortedBidHistory[0]?.userId || "N/A"
  const currentHighestBidTime = sortedBidHistory[0]?.timestamp
    ? format(sortedBidHistory[0].timestamp, "hh:mm a")
    : "N/A"

  return (
    <div className="rounded-xl p-6 border border-slate-700/30 bg-[#01212E]">
    
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Highest Bid</h3>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-white">₦{currentHighestBid.toLocaleString()}</div>
            <div className="text-teal-400 text-sm font-medium">{currentHighestBidder}</div>
          </div>
          <div className="text-teal-400 text-sm font-medium">{currentHighestBidTime}</div>
        </div>
      </div>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Bid History</h3>
        <div className="space-y-4">
          {sortedBidHistory.map((bid) => (
            <div key={bid.id} className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold text-white">₦{bid.amount.toLocaleString()}</div>
                <div className="text-teal-400 text-sm font-medium">{bid.userId}</div>
              </div>
              <div className="text-teal-400 text-sm font-medium">
                {bid.timestamp instanceof Date ? format(bid.timestamp, "hh:mm a") : "N/A"}
              </div>
            </div>
          ))}
          {sortedBidHistory.length === 0 && (
            <div className="text-gray-400 text-sm">No bids placed yet. Be the first!</div>
          )}
        </div>
      </div>

  
      <Button className="w-full bg-teal-600 hover:bg-teal-700 py-3 text-lg font-semibold rounded-xl">Refresh</Button>
    </div>
  )
}
