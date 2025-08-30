import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import MarketingStats from "./components/MarketingStats"
import MarketingActions from "./components/MarketingActions"
import OngoingAuctions from "./components/OngoingAuction"
import RegisterUserModal from "./components/RegisterUserModal"
import PageHeader from "@/components/page-header/PageHeader"


const MarketingDashboard = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#01151C]">


      <main className="px-4 py-6 md:px-8 md:py-12">
        {/* Mobile Back Button and Title */}
        <div className="md:hidden flex items-center gap-3 mb-6">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-white text-xl font-semibold">Marketing Dashboard</h1>
        </div>

        {/* Desktop Title */}
        <h1 className="hidden md:block text-white text-4xl font-bold mb-8">Marketing Dashboard</h1>

        <PageHeader title="Marketing Dashboard" backUrl="/" />

        <div className="max-w-6xl mx-auto">
          <MarketingStats />
          <MarketingActions onRegisterClick={() => setShowRegisterModal(true)} />
          <OngoingAuctions />
        </div>
      </main>

      <RegisterUserModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
    </div>
  )
}

export default MarketingDashboard;
