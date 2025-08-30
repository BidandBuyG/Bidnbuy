/**
 * @file components/wallet-ledger/streak-reward-section.tsx
 * @description Presentational component for displaying a streak reward.
 */

import { Trophy } from "lucide-react"

/**
 * StreakRewardSection component displays information about a user's streak reward.
 * @returns {JSX.Element} The rendered streak reward section.
 */

const StreakReward = () => {
  return (
    <div className="p-4 rounded-lg border border-[#00707B] mb-8" style={{ backgroundColor: "#013139" }}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
          <Trophy className="w-6 h-6 text-gray-800" />
        </div>
        <div>
          <p className="text-white text-lg font-semibold">7 days = N300 Reward</p>
          <p className="text-gray-300 text-sm">Keep your streak going!</p>
        </div>
      </div>
    </div>
  )
}

export default StreakReward;
