import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import PaymentMethodSelector from "./components/PaymentMethodSelector"
import AmountInput from "./components/AmountInput"

/**
 * Simulates an API call for a wallet transaction.
 * @param {number} amount - The amount to top up.
 * @returns {Promise<{ success: boolean; transactionId: string; message?: string }>} 
 */



/**
 * AddBidCredit page allows users to select a payment method and complete the transaction.
 * @returns {JSX.Element} The rendered add bid credit page.
 */

const AddBidCredit = () => {
  

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

  return (
    <div className="min-h-screen bg-[#01151C]">
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-none md:mx-0">

          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6 w-full">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Add Bid Credit</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">Add Bid Credit</h1>

          <PaymentMethodSelector selectedPayment={selectedPayment} onSelectPayment={setSelectedPayment} />
          <AmountInput value={topUpAmount} onChange={setTopUpAmount} />

          {/* Complete Transaction Button */}
          <div className="flex justify-center md:justify-start">
            <Button
              onClick={handleCompleteTransaction}
              disabled={walletMutation.isPending} // Disable button during mutation
              className="w-full max-w-sm text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center bg-[#00707B]"
              size="lg"
            >
              {walletMutation.isPending ? "Processing..." : "Complete Transaction"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddBidCredit;
