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

type ReferralStats = {
  totalReferrals: number
  pendingReferrals: number
  rewardedReferrals: number
  totalRewards: number
  pendingRewards: number
  rewardedAmount: number
}
