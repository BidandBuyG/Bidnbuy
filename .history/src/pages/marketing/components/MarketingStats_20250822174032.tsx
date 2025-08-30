import { Card } from "@/components/ui/card"
import { useMarketingStore } from "@/store/marketing-store"

const MarketingStats = () => {
  const { stats } = useMarketingStore()

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
      <Card className="p-4 md:p-6 bg-teal-900/20 border-teal-600/30">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.totalSignups}</div>
          <div className="text-xs md:text-sm text-teal-200">Total Signups</div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-teal-900/20 border-teal-600/30">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.referralClicks}</div>
          <div className="text-xs md:text-sm text-teal-200">Referral Clicks</div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-teal-900/20 border-teal-600/30">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.rewardsEarned} B.C</div>
          <div className="text-xs md:text-sm text-teal-200">Rewards Earned</div>
        </div>
      </Card>
    </div>
  )
}

export default MarketingStats;
