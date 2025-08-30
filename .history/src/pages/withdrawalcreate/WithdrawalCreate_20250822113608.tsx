import { useNavigate } from "react-router-dom"
import { User, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import Header from "@/components/header/Header"

import { useWithdrawalStore } from "@/store/withdrawal-store"

import { WithdrawalForm } from "./components/WithdrawalForm"
import { useWithdrawal } from "./hooks/use-withdrawal"
import type { WithdrawalFormData } from "./lib/withdrawal-schema"


export default function WithdrawPage() {
  const navigate = useNavigate();
  const { mutate: processWithdrawal, isPending } = useWithdrawal()
  const { isProcessing } = useWithdrawalStore()

  const handleWithdrawal = (data: WithdrawalFormData) => {
    processWithdrawal(data, {
      onSuccess: (transaction: any) => {
        // Navigate to success page with transaction data
        navigate(
          `/withdraw/success?txn=${transaction.transactionId}&amount=${transaction.amount}&balance=${transaction.newBalance}`,
        )
      },
      onError: (error: any) => {
        console.error("Withdrawal failed:", error)
        // You could show a toast notification here
      },
    })
  }

//   const handleBack = () => {
//     navigate(-1)
//   }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#013139] to-[#001B1F]">
      {/* Header */}
      <header className="bg-[#00707B] px-4 py-4">
        <div className="flex items-center justify-between">
          
          <Header />

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white p-2">
              <User className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white p-2">
              <Bell className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

    
      <main className="px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-4xl mx-auto">
        
          <div className="hidden md:block mb-8">
            <nav className="text-gray-400 text-sm">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span className="text-white">Withdraw</span>
            </nav>
          </div>

   
          <WithdrawalForm onSubmit={handleWithdrawal} isLoading={isPending || isProcessing} />
        </div>
      </main>
    </div>
  )
}
