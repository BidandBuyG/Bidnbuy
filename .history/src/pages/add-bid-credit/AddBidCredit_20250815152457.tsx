import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMutation } from "@tanstack/react-query"
import { useBidCreditStore } from "@/store/bid-credit-store"

import { toast } from "sonner"

/**
 * Simulates an API call for a wallet transaction.
 * @param {number} amount - The amount to top up.
 * @returns {Promise<{ success: boolean; transactionId: string; message?: string }>} 
 */

const simulateWalletTransaction = async (amount: number) => {
  return new Promise<{ success: boolean; transactionId: string; message?: string }>((resolve) => {
    setTimeout(() => {
      if (amount > 0) {
        resolve({ success: true, transactionId: `TXN${Date.now()}`, message: "Wallet top-up successful!" })
      } else {
        resolve({ success: false, transactionId: "", message: "Invalid amount." })
      }
    }, 1000)
  })
}

/**
 * AddBidCredit page allows users to select a payment method and complete the transaction.
 * @returns {JSX.Element} The rendered add bid credit page.
 */

const AddBidCredit = () => {
  const navigate =  useNavigate()

  
  const lastTopUpAmount = useBidCreditStore((state) => state.lastTopUpAmount)
  const topUpBalance = useBidCreditStore((state) => state.topUpBalance)
  const setLastTransactionId = useBidCreditStore((state) => state.setLastTransactionId)
  const setLastTopUpAmount = useBidCreditStore((state) => state.setLastTopUpAmount)

  const [selectedPayment, setSelectedPayment] = useState<string>("wallet")
  // Initialize topUpAmount with the value from the store if available
  const [topUpAmount, setTopUpAmount] = useState<string>(lastTopUpAmount !== null ? String(lastTopUpAmount) : "")

 
  })

  

  return <PaymentFeature showAmountInput={true} />;
}

export default AddBidCredit;
