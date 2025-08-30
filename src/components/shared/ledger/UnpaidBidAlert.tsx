/**
 * @file components/wallet-ledger/unpaid-bid-alert.tsx
 * @description Presentational component for displaying an unpaid bid warning.
 */

import { X, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

/**
 * Props for the UnpaidBidAlert component.
 * @typedef {Object} UnpaidBidAlertProps
 * @property {() => void} onPayNow - Callback function when "Pay Now" button is clicked.
 */

type UnpaidBidAlertProps = {
  onPayNow: () => void
}

/**
 * UnpaidBidAlert component displays a warning message about pending unpaid bids.
 * It can be dismissed by the user and styled with a specific border.
 * @param {UnpaidBidAlertProps} props - The component props.
 * @returns {JSX.Element | null} The rendered alert or null if dismissed.
 */


const UnpaidBidAlert = ({ onPayNow }: UnpaidBidAlertProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="p-4 rounded-lg border border-[#00707B] mb-8">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <TriangleAlert className="w-5 h-5 text-yellow-500" />
          <p className="text-yellow-500 font-semibold">Unpaid Bid Warning</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-gray-300 text-sm mb-4">You have a pending unpaid bid! Pay within 3 days to avoid penalties.</p>
      <Button
        onClick={onPayNow}
        className="w-full text-white font-semibold rounded-lg hover:opacity-90 transition-opacity py-2"
        style={{ backgroundColor: "#00707B" }}
      >
        Pay Now
      </Button>
    </div>
  )
}

export default UnpaidBidAlert;
