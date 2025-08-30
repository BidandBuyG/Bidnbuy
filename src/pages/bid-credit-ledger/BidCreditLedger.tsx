/**
 * @file app/bid-credit-ledger/page.tsx
 * @description Container component for the BidCredit Ledger page.
 * Displays user bid credit details and transaction history, mirroring the Wallet Ledger structure.
 */

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom"
import { useBidCreditStore } from "@/store/bid-credit-store"

import { Button } from "@/components/ui/button" 
import UserProfile from "@/components/shared/ledger/UserProfile"
import BalanceSummary from "@/components/shared/ledger/BalanceSummary"
import UnpaidBidAlert from "@/components/shared/ledger/UnpaidBidAlert"
import BonusTiersSection from "./components/BonusTierSection"
import TransactionList from "@/components/shared/ledger/TransactionList"

import AmeliaProfileImage from "@/assets/user/amelia-profile-image.jpg"

/**
 * BidCreditLedgerPage component displays the user's bid credit balance,
 * funds breakdown, and recent transactions, similar to the Wallet Ledger.
 * @returns {JSX.Element} The rendered bid credit ledger page.
 */

const BidCreditLedger = () => {

  const navigate = useNavigate()
  const currentBidCreditBalance = useBidCreditStore((state) => state.currentBalance)

  /**
   * Handles the "Pay Now" action in the unpaid bid warning.
   * Currently shows a toast, but can be extended to navigate to a payment page.
   */
  const handlePayNow = () => {
    toast.info("Redirecting to payment for unpaid bid...")
    // In a real app, you would navigate to a payment page or trigger a payment flow
  }

  /**
   * Handles the "Top-up BidCredit" button click.
   * Navigates to the main top-up page.
   */
  const handleTopUpBidCredit = () => {
    navigate("/bid-credit-top-up")
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
  
      <main className="px-4 py-6 md:px-8 md:py-12">
   
        <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-4xl">
       
          <div className="md:hidden flex items-center gap-3 mb-6 w-full">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">BidCredit Ledger</h1> 
          </div>
          
          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">BidCredit Ledger</h1> 
          <UserProfile name="Amelia" handle="@amelia_123" avatarSrc={AmeliaProfileImage} />
          <BalanceSummary walletBalance="N1,250" bidCreditBalance={`${currentBidCreditBalance.toLocaleString()} B.C`} />
          <UnpaidBidAlert onPayNow={handlePayNow} />

          <BonusTiersSection />

          
       
          <TransactionList />
        
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleTopUpBidCredit}
              className="w-full max-w-sm text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center"
              size="lg"
              style={{ backgroundColor: "#00707B" }}
            >
              Top-up BidCredit
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BidCreditLedger;
