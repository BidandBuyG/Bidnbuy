import { Card } from "@/components/ui/card"
import { useMarketingStore } from "@/store/marketing-store"

const OngoingAuctions = () => {
  const { ongoingAuctions } = useMarketingStore()

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Ongoing Auctions</h2>

      <div className="space-y-3">
        {ongoingAuctions.map((auction) => (
          <Card key={auction.id} className="p-4 bg-teal-900/20 border-teal-600/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 relative rounded-lg overflow-hidden bg-teal-800">
                <img src={auction.image || "/placeholder.svg"} alt={auction.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm md:text-base truncate">{auction.title}</h3>
                <p className="text-teal-200 text-xs md:text-sm">Current Bid: ₦{auction.currentBid.toLocaleString()}</p>
                <p className="text-teal-300 text-xs">Time Left: {auction.timeLeft}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OngoingAuctions;
