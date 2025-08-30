/**
 * @file app/referrals/page.tsx
 * @description Main referrals page displaying referral code, stats, and share functionality.
 */

import { ArrowLeft } from "lucide-react"
// import { ReferralHero } from "@/components/referral/referral-hero"
// import { ReferralCodeSection } from "@/components/referral/referral-code-section"
import { ReferralStatsSection } from "@/components/referral/referral-stats"
import { SharePreview } from "@/components/referral/share-preview"
import { Link } from "react-router-dom"
import ReferralHero from "./components/ReferralHero"


/**
 * ReferralsPage component displays the complete referral system interface.
 * @returns {JSX.Element} The rendered referrals page.
 */

const Referrals = () => {
  // Mock data...but, this would come from the API or store
  const referralCode = "REF123456"
  const referralStats = {
    totalReferrals: 10, 
    pendingReferrals: 2,
    rewardedReferrals: 8, 
    totalRewards: 50, 
    pendingRewards: 20,
    rewardedAmount: 30,
  }

  return (
    <div className="min-h-screen bg-[#01151C]">

      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-4xl">

          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <Link to="/wallet-ledger" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Referrals</h1>
          </div>

          <ReferralHero />
          <ReferralCodeSection referralCode={referralCode} />

          
          <div className="">
            <ReferralStatsSection stats={referralStats} />
          </div>

          <SharePreview referralCode={referralCode} />
        </div>
      </main>
    </div>
  )
}

export default Referrals;
