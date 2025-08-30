import { Link, useNavigate } from "react-router-dom"

import { ArrowLeft } from "lucide-react"

import TopUpForm from "./components/TopUpForm"

import { useBidCreditStore } from "@/store/bid-credit-store"

/**
 * @file pages/BidCredit.tsx
 * @description Main page for the Bid Credit Top-up UI.
 * This acts as a container component, managing state and handling child components.
 */

/**
 * Component for the main Bid Credit Top-up page.
 * Displays the user's balance and allows selection of top-up amounts.
 * @returns {JSX.Element} The rendered top-up page.
 */

const BidCreditTopUp = () => {
  const navigate = useNavigate()
  const currentBalance = useBidCreditStore((state) => state.currentBalance)
  const setLastTopUpAmount = useBidCreditStore((state) => state.setLastTopUpAmount)

  /**
   * Handles the "Top Up Now" action.
   * Sets the selected top-up amount in the store and navigates to the add bid credit page.
   * @param {number} amount - The selected top-up amount.
   */

  const handleTopUpNow = (amount: number) => {
    setLastTopUpAmount(amount) // Store the amount for the next page
    navigate("/add-bid-credit")
  }

  return (
    <div className="min-h-screen bg-[#01151C]">
  
      <main className="px-4 py-6 md:px-8 md:py-12">
        
        <div className="mobile md:hidden flex items-center gap-3 mb-6 w-full">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-white text-xl font-semibold">Top Up BidCredits</h1>
        </div>

        
        <h1 className="desktop hidden md:block text-white text-4xl font-bold mb-8">Top Up BidCredits</h1>

        <TopUpForm currentBalance={currentBalance} onTopUpNow={handleTopUpNow} />
      </main>
    </div>
  )
}

export default BidCreditTopUp;
