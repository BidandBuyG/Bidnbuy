/**
 * @file app/wallet-ledger/page.tsx
 * @description Container component for the Wallet Ledger page.
 * Orchestrates various presentational components to display user wallet details and transaction history.
 */

import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { useBidCreditStore, type BidCreditState } from "@/store/bid-credit-store";

import { Button } from "@/components/ui/button";

import UserProfile from "../../components/shared/ledger/UserProfile";
import BalanceSummary from "../../components/shared/ledger/BalanceSummary";
import UnpaidBidAlert from "../../components/shared/ledger/UnpaidBidAlert";
import FundsBreakdown from "./components/FundsBreakdown";
import TransactionList from "../../components/shared/ledger/TransactionList";
import StreakReward from "./components/StreakReward";
import RewardsSection from "./components/RewardsSection";

import AmeliaProfileImage from "@/assets/user/amelia-profile-image.jpg";

/**
 * WalletLedgerPage component displays the user's wallet balance, bid credit,
 * funds breakdown, and recent transactions.
 * @returns {JSX.Element} The rendered wallet ledger page.
 */

const WalletLedger = () => {
  const navigate = useNavigate();
  // const { currentWalletBalance, currentBidCreditBalance } = useBidCreditStore(
  //   (state: BidCreditState) => ({ 
  //     currentWalletBalance: state.currentBalance,
  //     currentBidCreditBalance: state.bidBalance
  //   }),
  //   shallow
  // );

  const currentBidCreditBalance = useBidCreditStore((state) => state.bidBalance);
  const currentWalletBalance = useWithdra

  console.log("Store values:", { currentWalletBalance, currentBidCreditBalance });

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setCashToBePaid(500); // mock "cash to be paid" value
  //   }, 500);

  //   return () => clearTimeout(timeout);
  // }, [setCashToBePaid]);

  /**
   * Handles the "Pay Now" action in the unpaid bid warning.
   * Currently shows a toast, but can be extended to navigate to a payment page.
   */
  const handlePayNow = () => {
    toast.info("Redirecting to payment for unpaid bid...");
    // In a real app, you would navigate to a payment page or trigger a payment flow
  };

  const handleWithdrawal = () => navigate("/withdraw");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-4xl">
          {/* Mobile Title */}
          <div className="md:hidden flex items-center gap-3 mb-6 w-full">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Wallet</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">
            My Wallet
          </h1>

          <UserProfile
            name="Amelia"
            handle="@amelia_123"
            avatarSrc={AmeliaProfileImage}
          />
          <BalanceSummary
            walletBalance={`N${currentWalletBalance.toLocaleString()}`}
            bidCreditBalance={`${currentBidCreditBalance.toLocaleString()} B.C`}
          />
          <UnpaidBidAlert onPayNow={handlePayNow} />

          <div className="flex justify-center my-12">
            <Button
              onClick={handleWithdrawal}
              className="w-full max-w-sm text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center bg-[#00707B] hover:bg-teal-700 cursor-pointer"
              size="lg"
            >
              Withdraw
            </Button>
          </div>

          <FundsBreakdown
            availableFunds="N1,250"
            lockedFunds="N250"
            frozenFunds="N0.00"
          />

          <div className="md:hidden">
            <StreakReward />
          </div>
          <RewardsSection />
          <TransactionList />
        </div>
      </main>
    </div>
  );
};

export default WalletLedger;
