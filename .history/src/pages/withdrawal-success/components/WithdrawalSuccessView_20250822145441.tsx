import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useWithdrawalStore } from "@/store/withdrawal-store"

type WithdrawalSuccessProps = {
  amount?: string
  transactionId?: string
  newBalance?: string
}

const WithdrawalSuccessView = ({ amount, transactionId, newBalance }: WithdrawalSuccessProps) => {
  const navigate = useNavigate()
  const currentWalletBalance = useWithdrawalStore((state) => state.currentBalance)
  const { currentBalance } = useWithdrawalStore()

  // Use props or fallback to store data
  const displayAmount = amount || currentBalance?.amount?.toString() || "0"
  const displayTxnId = transactionId || currentBalance?.transactionId || "TXN000000000"
  const displayBalance = newBalance || currentBalance?.newBalance?.toString() || "0"

  const handleBackToDashboard = () => {
    navigate("/wallet-ledger")
  }

  return (
    <div className="w-full max-w-md mx-auto md:max-w-lg text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>

      {/* Success Message */}
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">Withdrawal Successful</h1>

      <p className="text-gray-300 text-lg mb-8">
        You have successfully withdrawn ₦{Number(displayAmount).toLocaleString()} to your bank account.
      </p>

      {/* New Balance Card */}
      <div className="bg-[#00707B] rounded-lg p-6 mb-6">
        <p className="text-gray-300 text-sm mb-2">New Wallet Balance</p>
        <p className="text-white text-3xl font-bold">₦{Number(displayBalance).toLocaleString()}</p>
      </div>

      {/* Transaction Details */}
      <div className="flex justify-between items-center text-gray-300 mb-8">
        <span>Transaction ID</span>
        <span className="text-white font-mono">{displayTxnId}</span>
      </div>


      <Button
        onClick={handleBackToDashboard}
        className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg"
      >
        Back to Dashboard
      </Button>
    </div>
  )
}

export default WithdrawalSuccessView;
