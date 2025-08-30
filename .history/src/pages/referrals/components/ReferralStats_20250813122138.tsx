/**
 * @file components/referral/referral-stats.tsx
 * @description Component for displaying referral statistics and status.
 */

import { useState } from "react"

import type { ReferralStatsSectionProps } from "../types/referrals"
import DesktopReferralStats from "./DesktopReferralStats"


/**
 * ReferralStatsSection component displays referral statistics with different layouts for mobile and desktop.
 * @param {ReferralStatsSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered referral stats section.
 */

const ReferralStats = ({ stats }: ReferralStatsSectionProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  /**
   * Toggles the expanded state of a stat item.
   * @param {string} key - The key of the item to toggle.
   */
  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const referralStatsProps = {
    stats,
    expandedItems,
    toggleExpanded
  }

  return (
    <>
      {/* Mobile Stats */}
      <div className="md:hidden">
        
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold mb-6">Your referrals</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-[#00707B]" style={{ backgroundColor: "#013139" }}>
              <p className="text-gray-300 text-base mb-2">Total referrals</p>
              <p className="text-white text-2xl font-bold">{stats.totalReferrals}</p>
            </div>
            <div className="p-4 rounded-lg border border-[#00707B]" style={{ backgroundColor: "#013139" }}>
              <p className="text-gray-300 text-base mb-2">Rewards</p>
              <p className="text-white text-2xl font-bold">{stats.totalRewards} BidCredits</p>
            </div>
          </div>
        </div>

        {/* Rewards Status */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold mb-6">Rewards Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white text-base font-semibold">{stats.pendingReferrals} referrals</p>
                <p className="text-gray-400 text-sm">Pending</p>
              </div>
              <p className="text-gray-300 text-base">{stats.pendingRewards} BidCredit</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white text-base font-semibold">{stats.rewardedReferrals} referrals</p>
                <p className="text-gray-400 text-sm">Rewarded</p>
              </div>
              <p className="text-gray-300 text-base">{stats.rewardedAmount} BidCredit</p>
            </div>
          </div>
        </div>
      </div>

<DesktopReferralStats
  stats={stats}
  expandedItems={expandedItems}
  toggleExpanded={toggleExpanded}
/>

     
    </>
  )
}

export default ReferralStats;
