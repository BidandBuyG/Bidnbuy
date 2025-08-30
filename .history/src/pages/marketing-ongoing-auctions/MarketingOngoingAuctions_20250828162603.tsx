import { AuctionFilter } from "@/components/auctions/auction-filter"
import { AuctionItem } from "@/components/auctions/auction-item"
import { Button } from "@/components/ui/button"
import { useAuctionsStore } from "@/store/auctions-store"
import { ArrowLeft, Bell, Menu, User } from "lucide-react"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

const MarketingOngoingAuctions = () => {
  const router = useRouter()
  const { getFilteredAuctions, setFilter } = useAuctionsStore()
  const filteredAuctions = getFilteredAuctions()

  const handleBack = () => {
    router.back()
  }

  const handleFilterChange = (filter: string) => {
    setFilter(filter)
  }

  const handleJoinBid = (auctionId: string) => {
    // In a real app, this would open a bid modal
    toast.success("Bid placement feature coming soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900">
      {/* Header */}
      <header className="bg-teal-800/50 backdrop-blur-sm border-b border-teal-700/50 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          {/* Left side - Menu and Back */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-teal-700/50 lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBack} className="text-white hover:bg-teal-700/50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src="/images/bidnbuy-logo.png" alt="BidnBuy" fill className="object-contain" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">B</span>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-teal-700/50">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-teal-700/50">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Page Title and Filter */}
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
                title={auction.title}
                image={auction.image}
                currentBid={`₦${auction.currentBid.toLocaleString()}`}
                timeLeft={auction.timeLeft}
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
