/**
 * @file components/referral/referral-stats.tsx
 * @description Component for displaying referral statistics and status.
 */

import { useState } from "react"

import type { ReferralStatsSectionProps } from "../types/referrals"


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

<DesktopReferralStats {...referralStatsProps} />

      {/* Desktop Stats */}
      <div className="hidden md:block mb-8">
        <h2 className="text-white text-xl font-semibold mb-6">Referral Status</h2>
        <div className="space-y-4">

          {/* Total referrals */}
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-[#00707B] cursor-pointer hover:bg-[#013139]/50 transition-colors"
            onClick={() => toggleExpanded("total")}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {expandedItems["total"] ? (
                  <Minus className="w-4 h-4 text-gray-800" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-800" />
                )}
              </div>
              <div>
                <p className="text-white text-base font-semibold">Total referrals</p>
              </div>
            </div>
            <p className="text-white text-base font-semibold">{stats.totalReferrals}</p>
          </div>

          {/* Pending */}
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-[#00707B] cursor-pointer hover:bg-[#013139]/50 transition-colors"
            onClick={() => toggleExpanded("pending")}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {expandedItems["pending"] ? (
                  <Minus className="w-4 h-4 text-gray-800" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-800" />
                )}
              </div>
              <div>
                <p className="text-white text-base font-semibold">Pending</p>
              </div>
            </div>
            <p className="text-white text-base font-semibold">{stats.pendingReferrals}</p>
          </div>

          {/* Rewarded */}
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-[#00707B] cursor-pointer hover:bg-[#013139]/50 transition-colors"
            onClick={() => toggleExpanded("rewarded")}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {expandedItems["rewarded"] ? (
                  <Minus className="w-4 h-4 text-gray-800" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-800" />
                )}
              </div>
              <div>
                <p className="text-white text-base font-semibold">Rewarded</p>
              </div>
            </div>
            <p className="text-white text-base font-semibold">{stats.rewardedReferrals}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReferralStats;
