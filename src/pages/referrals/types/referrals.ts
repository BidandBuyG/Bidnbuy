/**
 * Props for the ReferralCodeSection component.
 * @typedef {Object} ReferralCodeSectionProps
 * @property {string} referralCode - The user's referral code.
 */

export type ReferralCodeSectionProps = {
  referralCode: string
}

/**
 * Type for referral statistics.
 * @typedef {Object} ReferralStats
 * @property {number} totalReferrals - Total number of referrals made.
 * @property {number} pendingReferrals - Number of pending referrals.
 * @property {number} rewardedReferrals - Number of rewarded referrals.
 * @property {number} totalRewards - Total BidCredits earned from referrals.
 * @property {number} pendingRewards - Pending BidCredits from referrals.
 * @property {number} rewardedAmount - BidCredits earned from rewarded referrals.
 */

export type ReferralStats = {
  totalReferrals: number
  pendingReferrals: number
  rewardedReferrals: number
  totalRewards: number
  pendingRewards: number
  rewardedAmount: number
}


/**
 * Props for the ReferralStatsSection component.
 * @typedef {Object} ReferralStatsSectionProps
 * @property {ReferralStats} stats - The referral statistics to display.
 */
export type ReferralStatsSectionProps = {
  stats: ReferralStats
}



export type ReferralStatusProps = {
  stats: ReferralStats
  expandedItems: Record<string, boolean>
  toggleExpanded: (key: string) => void
}

/**
 * Props for the SharePreview component.
 * @typedef {Object} SharePreviewProps
 * @property {string} referralCode - The user's referral code.
 */

export type SharePreviewProps = {
  referralCode: string
}