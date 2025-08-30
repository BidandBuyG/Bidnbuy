import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMutation } from "@tanstack/react-query"
import { useBidCreditStore } from "@/store/bid-credit-store"


import { simulateWalletTransaction } from "../utils/simulateWalletTransaction"
import { toast } from "sonner"

export const usePaymentFeature = () => {
    const navigate =  useNavigate()

  
  const lastTopUpAmount = useBidCreditStore((state) => state.lastTopUpAmount)
  const topUpBalance = useBidCreditStore((state) => state.topUpBalance)
  const setLastTransactionId = useBidCreditStore((state) => state.setLastTransactionId)
  const setLastTopUpAmount = useBidCreditStore((state) => state.setLastTopUpAmount)

  const [selectedPayment, setSelectedPayment] = useState<string>("wallet")
  
  // Initialize topUpAmount with the value from the store if available
  const [topUpAmount, setTopUpAmount] = useState<string>(lastTopUpAmount !== null ? String(lastTopUpAmount) : "")

  
  const walletMutation = useMutation({
    mutationFn: simulateWalletTransaction,
    onSuccess: (data) => {
      const amountParsed = Number.parseFloat(topUpAmount) // Use the current input value for the actual transaction
      if (data.success && !isNaN(amountParsed) && amountParsed > 0) {
        topUpBalance(amountParsed) 
        setLastTopUpAmount(amountParsed) 
        setLastTransactionId(data.transactionId)
        navigate("/bid-credit-top-up-success") 
      } else {
        toast.info(data.message || "An unknown error occurred during wallet top-up.")
      }
    },
    onError: (error) => {
      toast.error(`Failed to complete wallet transaction: ${error.message}`)
    
    },
  })

  return { selectedPayment, topUpAmount }

}