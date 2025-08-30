import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import ReferralHero from "./components/ReferralHero";
import { ReferralCodeSection } from "./components/ReferralCodeSection";
import ReferralStats from "./components/ReferralStats";
import SharePreview from "./components/SharePreview";

/**
 * ReferralsPage component displays the complete referral system interface.
 * @returns {JSX.Element} The rendered referrals page.
 */

const Referrals = () => {
  // Mock data...but, this would come from the API or store
  const referralCode = "REF123456";
  const referralStats = {
    totalReferrals: 10,
    pendingReferrals: 2,
    rewardedReferrals: 8,
    totalRewards: 50,
    pendingRewards: 20,
    rewardedAmount: 30,
  };

  return (
    <div className="min-h-screen bg-[#01151C]">
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-4xl">

          <PageHeader title="Referrals" backUrl="/wallet-ledger" />
          

          <ReferralHero />
          <ReferralCodeSection referralCode={referralCode} />

          <ReferralStats stats={referralStats} />

          <SharePreview referralCode={referralCode} />
        </div>
      </main>
    </div>
  );
};

export default Referrals;
