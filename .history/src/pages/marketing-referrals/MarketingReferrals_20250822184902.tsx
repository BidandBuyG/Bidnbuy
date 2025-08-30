import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { useMarketingStore } from "@/store/marketing-store"

import { Skeleton } from "@/components/ui/skeleton"

import { ReferralsTable } from "./components/ReferralsTable"
import EmptyReferrals from "./components/EmptyReferrals"

import { useReferrals } from "../marketing/hooks/useMarketing"

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
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <Skeleton className="h-10 flex-1 bg-teal-800/50" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-20 bg-teal-800/50" />
                  <Skeleton className="h-10 w-20 bg-teal-800/50" />
                </div>
              </div>
              <Skeleton className="h-6 w-12 bg-teal-800/50" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full bg-teal-800/50" />
                ))}
              </div>
            </div>
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
