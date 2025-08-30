import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { toast } from "sonner"
import { useBidCreditStore } from "@/store/bid-credit-store"

import SuccessDetails from "./components/SuccessDetails"
import SuccessActions from "./components/SuccessActions"
import PageHeader from "@/components/page-header/PageHeader"



/**
 * @file app/bid-credit-top-up/page.tsx
 * @description Page displayed after a successful bid credit top-up.
 * This acts as a container component, fetching data from the store and handling navigation.
 */

/**
 * BidCreditTopUpSuccess page displays the details of a successful top-up.
 * @returns {JSX.Element} The rendered success page.
 */

const BidCreditTopUpSuccess = () => {
  const navigate = useNavigate()


  const currentBalance = useBidCreditStore((state) => state.currentBalance)
  const lastTopUpAmount = useBidCreditStore((state) => state.lastTopUpAmount)
  const lastTransactionId = useBidCreditStore((state) => state.lastTransactionId)
  const resetTransactionDetails = useBidCreditStore((state) => state.resetTransactionDetails)

  
  useEffect(() => {
    if (lastTopUpAmount === null || lastTransactionId === null) {
      navigate('/bid-credit-top-up', { replace: true });
      toast.error("No transaction details found. Please try topping up again.");
    }
  }, [lastTopUpAmount, lastTransactionId, navigate])

  /**
   * Handles the "View Transaction History" button click.
   * Currently shows a toast, but can be extended to navigate to a history page.
   */
  const handleViewHistory = () => {
    toast.info("View Transaction History page is under development.")
    navigate("/wallet-ledger") 
  }

  /**
   * Handles the "Back to Dashboard" button click.
   * Resets transaction details and navigates back to the initial top-up page.
   */
  const handleBackToDashboard = () => {
    resetTransactionDetails()
    navigate("/bid-credit-top-up")
  }

  
  if (lastTopUpAmount === null || lastTransactionId === null) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
     
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-none md:mx-0">
          <PageHeader className="w-" title="BidCredit Top-Up" backUrl="/" />

          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6 w-full">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">BidCredit Top-Up</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">BidCredit Top-Up</h1>

          <SuccessDetails newBalance={currentBalance} transactionId={lastTransactionId} topUpAmount={lastTopUpAmount} />
          <SuccessActions onViewHistory={handleViewHistory} onBackToDashboard={handleBackToDashboard} />
        </div>
      </main>
    </div>
  )
}

export default BidCreditTopUpSuccess;
