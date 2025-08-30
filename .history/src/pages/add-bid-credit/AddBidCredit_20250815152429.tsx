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

  /**
   * React Query mutation for handling wallet transactions.
   * On success, updates the global balance and navigates to the success page.
   */
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

  /**
   * Handles the "Complete Transaction" button click.
   * Triggers different actions based on the selected payment method.
   */
  const handleCompleteTransaction = () => {
    if (selectedPayment === "paystack") {
      toast.info("Paystack integration is currently in progress. Please try again later.")
    } else if (selectedPayment === "wallet") {
      const amount = Number.parseFloat(topUpAmount)
      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid positive amount.")
        return
      }
      walletMutation.mutate(amount) // Trigger the wallet transaction mutation
    }
  }

  return <PaymentFeature showAmountInput={true} />;
}

export default AddBidCredit;
