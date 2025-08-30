import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/header"
import { WithdrawalForm } from "@/components/withdraw/withdrawal-form"


const WithdrawalCreate = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleWithdrawal = async (data: {
    amount: string
    bank: string
    accountNumber: string
  }) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Navigate to success page with data
    const searchParams = new URLSearchParams({
      amount: data.amount,
      bank: data.bank,
      accountNumber: data.accountNumber,
    })

    navigate(`/withdraw/success?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
      <Header />
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-4xl">
          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <Link to="/wallet-ledger" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Withdraw</h1>
          </div>

          {/* Desktop Title */}
          <div className="hidden md:block mb-8">
            <Link to="/wallet-ledger" className="inline-flex items-center gap-2 text-white hover:text-teal-400 mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Wallet</span>
            </Link>
            <h1 className="text-white text-4xl font-bold">Withdraw Funds</h1>
          </div>

          {/* Withdrawal Form */}
          <div className="flex justify-center">
            <WithdrawalForm balance="N1,250" onSubmit={handleWithdrawal} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default WithdrawalCreate;
