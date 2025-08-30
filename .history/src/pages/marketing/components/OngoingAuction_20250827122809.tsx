import { Card } from "@/components/ui/card"
import { useMarketingStore } from "@/store/marketing-store"

import AntiquePerfumeImg from '@/assets/products/antique-perfume-img.png';
import { Skeleton } from "@/components/ui/skeleton";

type OngoingAuctionsProps = {
  isLoading?: boolean
}

const OngoingAuctions = ({ isLoading }: OngoingAuctionsProps) => {
  const ongoingAuctions = useMarketingStore((state) => state.ongoingAuctions)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40 bg-[#00222E]" />
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 bg-[#00222E] border-[#00707B]">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded bg-[#00222E]" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2 bg-[#00222E]" />
                <Skeleton className="h-3 w-24 bg-[#00222E]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div></div>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Ongoing Auctions</h2>

      <div className="space-y-3">
        {ongoingAuctions.map((auction) => (
          <Card key={auction.id} className="p-4 bg-[bg-[#00222E] border-[#00707B]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 relative rounded-lg overflow-hidden bg-teal-800">
                <img src={AntiquePerfumeImg || auction.image } alt={auction.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm md:text-base truncate">{auction.title}</h3>
                <p className="text-white text-xs md:text-sm">Current Bid: ₦{auction.currentBid.toLocaleString()}</p>
                <p className="text-white text-xs">Time Left: {auction.timeLeft}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OngoingAuctions;