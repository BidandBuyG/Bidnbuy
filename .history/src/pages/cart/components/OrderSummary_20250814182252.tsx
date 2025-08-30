import { priceItems } from "../cart.utils"
import type { OrderSummaryProps } from "../types/cart"
import { PriceRow } from "./PriceRow"


/**
 * OrderSummary component displays the breakdown of costs and fees.
 * @param {OrderSummaryProps} props - The component props.
 * @returns {JSX.Element} The rendered order summary.
 */

export function OrderSummary({ data }: OrderSummaryProps) {

    const formatPrice = (amount: number): string => {
    return `N${amount.toLocaleString()}`
  }




  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
       
        {priceItems.map((item) => (
            <PriceRow key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      
      <div className="space-y-3 mb-6 text-gray-300 text-sm leading-relaxed">
        <p>Value Added Tax, a consumption tax on goods and services.</p>
        <p>Buyer fee, a fee charged to the buyer to cover transaction costs.</p>
        <p>
          Escrow fee, a fee for using the escrow service which secures the transaction until the buyer confirms the
          receipt of the item.
        </p>
        <p>Optional insurance to protect against loss or damage during shipping.</p>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-xl font-semibold">Total</span>
        </div>
        <div className="text-white text-2xl font-bold">{formatPrice(data.total)}</div>
      </div>
    </div>
  )
}
