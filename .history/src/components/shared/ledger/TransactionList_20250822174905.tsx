/**
 * @file components/wallet-ledger/transaction-list.tsx
 * @description Component for displaying recent transactions, adapting for mobile list and desktop table views.
 * This component is explicitly exported as a named export.
 */

import type React from "react"

import { Button } from "@/components/ui/button"
import { useWalletLedger } from '@/hooks/useWallet';
import { Plus, Minus, ChevronDown } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import ListingFeeIcon from "@/components/svg-icons/ListingFeeIcon";
import PaymentForUnpaidBidIcon from "@/components/svg-icons/PaymentForUnpaidBid";
import LoadingGrid from "@/components/loading-grid/LoadingGrid";


/**
 * Interface for a single transaction item.
 * @typedef {Object} Transaction
 * @property {string} id - Unique identifier for the transaction.
 * @property {string} date - The date of the transaction (e.g., "2025-07-26").
 * @property {string} time - The time of the transaction (e.g., "14:30").
 * @property {string} description - A description of the transaction (e.g., "Deposit via Paystack").
 * @property {number} amount - The transaction amount. Can be positive (deposit) or negative (withdrawal/fee).
 * @property {string} status - The status of the transaction (e.g., "Completed", "Pending").
 * @property {string} displayTime - The formatted time string for mobile display (e.g., "10:23 AM" or "3 days ago, 2:30 PM").
 */


export type TransactionType = {
  id: string
  date: string 
  time: string 
  description: string
  amount: number
  status: string
  displayTime: string 
}

/**
 * Helper function to get the appropriate icon for a transaction.
 * Returns either a Lucide React icon component or a string path to an SVG.
 * @param {string} description - The transaction description.
 * @param {number} amount - The transaction amount.
 * @returns {React.ElementType | string} The Lucide React icon component or path to SVG.
 */

const getTransactionIcon = (description: string, amount: number): React.ElementType | string => {
  if (description.includes("Listing Fee")) return ListingFeeIcon
  if (description.includes("Payment for Unpaid Bid")) return PaymentForUnpaidBidIcon
  // For other transactions, use Plus/Minus based on amount as per previous logic
  if (amount > 0) return Plus
  if (amount < 0) return Minus
  return Plus // Default fallback
}

/**
 * Helper function to format the transaction amount.
 * @param {number} amount - The transaction amount.
 * @returns {string} The formatted amount string (e.g., "+10,000 B.C", "-500").
 */
const formatAmount = (amount: number): string => {
  const sign = amount > 0 ? "+" : ""
  return `${sign}${amount.toLocaleString()} B.C`
}

/**
 * TransactionList component displays a list or table of recent transactions.
 * It fetches data using React Query and adapts its layout for mobile and desktop.
 * Includes sort and filter dropdowns.
 * @returns {JSX.Element} The rendered transaction list/table.
 */

const TransactionList = () => {
  const { data, isLoading, isError } = useWalletLedger();
  // API returns: { status: 'success', data: { transactions: [...] } }
  const transactions = data?.data?.transactions || [];

  if (isLoading) {
    return <div className="text-gray-300 text-center"><LoadingGrid ></div>;
  }
  if (isError) {
    return <div className="text-red-500 text-center">Error loading transactions.</div>;
  }
  if (!transactions.length) {
    return <div className="text-gray-400 text-center">No transactions yet.</div>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">Recent Transactions</h2>
      {/* Mobile View: Sort/Filter buttons and list */}
      <div className="md:hidden">
        <div className="flex gap-3 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-white border-[#00707B] bg-[#013139] hover:bg-[#00707B]/20">
                Sort <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#013139] border-[#00707B] text-white">
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Date (Oldest)</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Amount (High to Low)</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Amount (Low to High)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-white border-[#00707B] bg-[#013139] hover:bg-[#00707B]/20">
                Filter <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#013139] border-[#00707B] text-white">
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">All</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Deposits</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Withdrawals</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#00707B]/20 cursor-pointer">Fees</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4">
          {transactions.map((transaction: any) => {
            const icon = getTransactionIcon(transaction.meta?.description || '', transaction.amount);
            const isSvgPath = typeof icon === "string";
            const IconComponent = icon as React.ElementType;
            return (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 rounded-lg border border-[#013139]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    {isSvgPath ? (
                      <img
                        src={(icon as string) || "/placeholder.svg"}
                        alt={transaction.meta?.description}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <IconComponent className="w-5 h-5 text-gray-800" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-lg font-semibold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatAmount(transaction.amount)}{' '}
                      <span className="text-white font-semibold">{transaction.meta?.description}</span>
                    </p>
                    <p className="text-gray-300 text-sm">{new Date(transaction.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-gray-300 text-lg border-b border-[#00707B]">
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any) => (
              <tr key={transaction._id} className="border-b border-[#013139] hover:bg-[#013139]/50 transition-colors">
                <td className="py-3 px-4 text-gray-300">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-white">{transaction.meta?.description}</td>
                <td
                  className={`py-3 px-4 text-lg font-semibold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {formatAmount(transaction.amount)}
                </td>
                <td className="py-3 px-4 text-gray-300">{transaction.status || 'Completed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TransactionList;
