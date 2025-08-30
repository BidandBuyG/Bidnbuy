import { toast } from "sonner"

import AuctionFilter from "./components/AuctionFilter"
import { useAuctionStore } from "@/store/auction-store"
import { AuctionItem } from "./components/AuctionItem"

import AntiquePerfumeImg from '@/assets/products/antique-perfume-img.png';

const MarketingOngoingAuctions = () => {
  const { getFilteredAuctions, setFilter } = useAuctionStore()
  const filteredAuctions = getFilteredAuctions()

  const handleFilterChange = (filter: string) => {
    setFilter(filter)
  }

  const handleJoinBid = () => {
    // In a real app, this would open a bid modal
    toast.success("Bid placement feature coming soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900">
      

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl md:text-2xl font-bold">Ongoing Auctions</h1>
          <AuctionFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Auctions List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredAuctions.length > 0 ? (
            filteredAuctions.map((auction) => (
              <AuctionItem
                key={auction.id}
                id={auction.id}
                image={AntiquePerfumeImg}
                title={auction.title}
                currentBid={`₦${auction.currentBid.toLocaleString()}`}
                timeLeft={auction.endTime}
                onJoinBid={handleJoinBid}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">No auctions found</div>
              <div className="text-slate-500 text-sm">Try adjusting your filter criteria</div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  )
}

export default MarketingOngoingAuctions;
