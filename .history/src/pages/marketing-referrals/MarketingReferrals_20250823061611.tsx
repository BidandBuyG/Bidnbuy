import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { useMarketingStore } from "@/store/marketing-store"

import { Skeleton } from "@/components/ui/skeleton"

import { ReferralsTable } from "./components/ReferralsTable"
import EmptyReferrals from "./components/EmptyReferrals"

import { useReferrals } from "../marketing/hooks/useMarketing"
import LoadingTableGrid from "@/components/loading-table-grid/LoadingTableGrid"

const MarketingReferrals = () => {
  const { referralLink } = useMarketingStore()
  const { data: referrals, isLoading } = useReferrals()

  const hasReferrals = referrals && referrals.length > 0

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>

      <main className="px-4 py-6 md:px-8 md:py-12">
        {/* Mobile Back Button and Title */}
        <div className="md:hidden flex items-center gap-3 mb-6">
          <Link to="/marketing" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-white text-xl font-semibold">My Referrals</h1>
        </div>

        {/* Desktop Title */}
        <h1 className="hidden md:block text-white text-4xl font-bold mb-8">My Referrals</h1>

        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <LoadingTableGrid />
          ) : hasReferrals ? (
            <ReferralsTable />
          ) : (
            <EmptyReferrals referralLink={referralLink} />
          )}
        </div>
      </main>
    </div>
  )
}

export default MarketingReferrals;
