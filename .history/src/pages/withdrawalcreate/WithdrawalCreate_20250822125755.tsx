import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useWithdrawalStore } from "@/store/withdrawal-store"

import { WithdrawalForm } from "./components/WithdrawalForm"

import { useWithdrawal } from "./hooks/use-withdrawal"

import type { WithdrawalFormData } from "./lib/withdrawal-schema"


const WithdrawalCreate = () => {
  const navigate = useNavigate();
  const { mutate: processWithdrawal, isPending } = useWithdrawal()
  const { isProcessing } = useWithdrawalStore()

  const handleWithdrawal = (data: WithdrawalFormData) => {
    processWithdrawal(data, {
      onSuccess: (transaction: any) => {
        // Navigate to success page with transaction data
        navigate(
          `/withdraw/success`,
        )
      },
      onError: (error: any) => {
        console.error("Withdrawal failed:", error)
        toast.error("Withdrawal failed:", error.message)
      },
    })
  }

//   const handleBack = () => {
//     navigate(-1)
//   }

  return (
    <div className="min-h-screen bg-[#01151C]">
      

    
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

export default WithdrawalCreate;
