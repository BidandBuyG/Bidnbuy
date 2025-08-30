/**
 * @file components/top-up-form.tsx
 * @description Presentational component for selecting bid credit top-up amounts.
 * Handles local state for selected amount and triggers a callback on button click.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"

/**
 * Props for the TopUpForm component.
 * @typedef {Object} TopUpFormProps
 * @property {number} currentBalance - The user's current bid credit balance.
 * @property {(amount: number) => void} onTopUpNow - Callback function when "Top Up Now" button is clicked.
 */

type TopUpFormProps = {
  currentBalance: number
  onTopUpNow: (amount: number) => void
}

/**
 * TopUpForm component allows users to select a top-up amount and proceed.
 * @param {TopUpFormProps} props - The component props.
 * @returns {JSX.Element} The rendered top-up form.
 */

const TopUpForm = ({ currentBalance, onTopUpNow }: TopUpFormProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const topUpAmounts = [
    { value: 2000, label: "2,000" },
    { value: 5000, label: "5,000" },
    { value: 10000, label: "10,000" },
  ]

  const bonusInfo = [
    { amount: "200 BC", bonus: "+10% Bonus" },
    { amount: "500 BC", bonus: "+15% Bonus" },
    { amount: "1000 BC", bonus: "+20% Bonus" },
  ]

  return (
    <div className="max-w-md mx-auto md:max-w-none md:mx-0">
      
      <section className="balance-display">
        
        <div className="mb-8">
            <p className="text-gray-300 text-lg mb-2">Your Balance</p>
            <p className="text-white text-3xl font-bold">{currentBalance} B.C</p>
        </div>
      </section>

      {/* Amount Selection */}
      <div className="w-full md:max-w-lg mb-8">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">Select Top-Up Amount</h2>
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
          {topUpAmounts.map((amount) => (
            <button
              key={amount.value}
              onClick={() => setSelectedAmount(amount.value)}
              className={`
                px-4 py-4 md:px-6 md:py-6 rounded-lg border transition-all
                ${
                  selectedAmount === amount.value
                    ? "border-[#00707B] bg-[#00707B]/20"
                    : "border-[#00707B] hover:border-[#00707B]/80"
                }
              `}
              style={{ backgroundColor: "#013139" }}
            >
              <span className="text-white text-lg md:text-xl font-semibold">{amount.label}</span>
            </button>
          ))}
        </div>

        {/* Bonus Information */}
        <div className="space-y-4 px-2">
          {bonusInfo.map((info, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-300 text-lg">{info.amount}</span>
              <span className="text-gray-300 text-lg">{info.bonus}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Top Up Button */}
      <div className="flex justify-center md:justify-start">
        {" "}
        <Button
          onClick={() => selectedAmount && onTopUpNow(selectedAmount)}
          disabled={selectedAmount === null} 
          className="bg-[#00707B] hover:bg-[#00707B] w-full max-w-sm text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center"
          size="lg"
        >
          Top Up Now
        </Button>
      </div>
    </div>
  )
}

export default TopUpForm;
