import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button"


import { useEffect } from "react"
import { useBidCreditStore } from "@/store/bid-credit-store"
import WithdrawalSuccessView from "./components/WithdrawalSuccessView";

const WithdrawalSuccess = () => {

    const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)



  const amount = searchParams.get("amount")
  const transactionId = searchParams.get("txn")
  const newBalance = searchParams.get("balance")

  // Update Zustand store with new balance after withdrawal
  const setCurrentBalance = useBidCreditStore((state) => state.setCurrentBalance)
  useEffect(() => {
    if (newBalance && !isNaN(Number(newBalance))) {
      setCurrentBalance(Number(newBalance))
    }
  }, [newBalance, setCurrentBalance])

  // Defensive: check if we have any transaction data
  const hasData = amount || transactionId || newBalance

  const handleBack = () => {
    navigate("/wallet-ledger")
  }

  return (
    <div className="min-h-screen bg-[#01151C]">
      

      <main className="px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Desktop Breadcrumb */}
          <div className="hidden md:block mb-8">
            <nav className="text-gray-400 text-sm">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span>Withdraw</span>
              <span className="mx-2">/</span>
              <span className="text-white">Success</span>
            </nav>
          </div>

          {hasData ? (
            <WithdrawalSuccessView
              amount={amount || undefined}
              transactionId={transactionId || undefined}
              newBalance={newBalance || undefined}
            />
          ) : (
            <div className="text-center text-white py-12">
              <h2 className="text-2xl font-bold mb-4">No withdrawal data found</h2>
              <p className="mb-6">It looks like you navigated here without a recent withdrawal. Please make a withdrawal to see the success details.</p>
              <Button onClick={handleBack} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg">Back to Wallet</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default WithdrawalSuccess;
