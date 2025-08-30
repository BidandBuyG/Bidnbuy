/**
 * @file components/wallet-ledger/balance-summary.tsx
 * @description Presentational component for displaying wallet and bid credit balances.
 * Now includes click handlers for navigation to respective ledger pages.
 */

import { useNavigate, useLocation } from "react-router-dom"

/**
 * Props for the BalanceSummary component.
 * @typedef {Object} BalanceSummaryProps
 * @property {string} walletBalance - The user's wallet balance (formatted string).
 * @property {string} bidCreditBalance - The user's bid credit balance (formatted string).
 */
interface BalanceSummaryProps {
  walletBalance: string
  bidCreditBalance: string
}

/**
 * BalanceSummary component displays the user's wallet and bid credit balances in distinct cards.
 * Applies linear gradients as per design and handles navigation on click.
 * @param {BalanceSummaryProps} props - The component props.
 * @returns {JSX.Element} The rendered balance summary section.
 */

const BalanceSummary = ({ walletBalance, bidCreditBalance }: BalanceSummaryProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleWalletClick = () => {
    // Only navigate if not already on the wallet ledger page
    if (location.pathname !== "/wallet-ledger") {
      navigate("/wallet-ledger")
    }
  }

  const handleBidCreditClick = () => {
    // Navigate to the bid credit ledger page
    navigate("/bid-credit-ledger")
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div
        className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
        style={{
          background: "linear-gradient(to right, #4B6567, #96C9CD)",
        }}
        onClick={handleWalletClick}
      >
        <p className="text-white text-lg font-semibold mb-2">Wallet Balance</p>
        <p className="text-white text-2xl font-bold">{walletBalance}</p>
      </div>
   
      <div
        className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
        style={{
          background: "linear-gradient(to right, #7F5507, #E59A0D)",
        }}
        onClick={handleBidCreditClick}
      >
        <p className="text-white text-lg font-semibold mb-2">BidCredit Balance</p>
        <p className="text-white text-2xl font-bold">{bidCreditBalance}</p>
      </div>
    </div>
  )
}


export default BalanceSummary;