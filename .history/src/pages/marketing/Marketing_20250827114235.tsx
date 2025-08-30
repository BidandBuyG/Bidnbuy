import { useState } from "react"

import PageHeader from "@/components/page-header/PageHeader"

import { useMarketingStats } from "./hooks/useMarketing"

import MarketingStats from "./components/MarketingStats"
import MarketingActions from "./components/MarketingActions"
import OngoingAuctions from "./components/OngoingAuction"
import RegisterUserModal from "./components/RegisterUserModal"


const MarketingDashboard = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { data: stats, isLoading } = useMarketingStats()

  return (
    <div className="min-h-screen bg-[#01151C]">


      <main className="px-4 py-6 md:px-8 md:py-12">
        
        <PageHeader title="Marketing Dashboard" backUrl="/" />

        <div className="max-w-6xl mx-auto">
          <MarketingStats isLoading={/>
          <MarketingActions onRegisterClick={() => setShowRegisterModal(true)} />
          <OngoingAuctions />
        </div>
      </main>

      <RegisterUserModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
    </div>
  )
}

export default MarketingDashboard;
