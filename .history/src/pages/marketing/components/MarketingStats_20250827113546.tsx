import { Card } from "@/components/ui/card"
import { useMarketingStore } from "@/store/marketing-store";


type MarketingStatsProps = {
  isLoading?: boolean
}


const MarketingStats = ({ isLoading }: MarketingStatsProps) => {
  const stats = useMarketingStore((state) => state.stats)


  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 bg-teal-800/30 border-teal-600/50">
            <Skeleton className="h-8 w-12 mb-2 bg-teal-700/50" />
            <Skeleton className="h-4 w-20 bg-teal-700/50" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
      <Card className="p-4 md:p-6 bg-[#00222E] border-[#00707B]">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.totalSignups}</div>
          <div className="text-xs md:text-sm text-teal-200">Total Signups</div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-[#00222E] border-[#00707B]">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.referralClicks}</div>
          <div className="text-xs md:text-sm text-teal-200">Referral Clicks</div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-[#00222E] border-[#00707B]">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.rewardsEarned} B.C</div>
          <div className="text-xs md:text-sm text-teal-200">Rewards Earned</div>
        </div>
      </Card>
    </div>
  )
}

export default MarketingStats;


"use client"

import { Card } from "@/components/ui/card"
import { useMarketingStore } from "@/store/marketing-store"
import { Skeleton } from "@/components/ui/skeleton"

interface MarketingStatsProps {
  isLoading?: boolean
}

export function MarketingStats({ isLoading }: MarketingStatsProps) {
  

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
      <Card className="p-4 bg-teal-800/30 border-teal-600/50 text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.totalSignups}</div>
        <div className="text-xs md:text-sm text-teal-200">Total Signups</div>
      </Card>

      <Card className="p-4 bg-teal-800/30 border-teal-600/50 text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.referralClicks}</div>
        <div className="text-xs md:text-sm text-teal-200">Referral Clicks</div>
      </Card>

      <Card className="p-4 bg-teal-800/30 border-teal-600/50 text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.rewardsEarned} B.C</div>
        <div className="text-xs md:text-sm text-teal-200">Rewards Earned</div>
      </Card>
    </div>
  )
}
