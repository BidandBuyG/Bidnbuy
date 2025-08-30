"use client"

/**
 * @file components/cart/order-summary.tsx
 * @description Component for displaying order summary with fees breakdown.
 */

/**
 * Interface for order summary data.
 * @typedef {Object} OrderSummaryData
 * @property {number} subtotal - Subtotal amount.
 * @property {number} shipping - Shipping cost.
 * @property {number} vat - VAT amount.
 * @property {number} buyerFee - Buyer fee.
 * @property {number} escrowFee - Escrow fee.
 * @property {boolean} insuranceSelected - Whether insurance is selected.
 * @property {number} insuranceFee - Insurance fee.
 * @property {number} total - Total amount.
 */
interface OrderSummaryData {
  subtotal: number
  shipping: number
  vat: number
  buyerFee: number
  escrowFee: number
  insuranceSelected: boolean
  insuranceFee: number
  total: number
}

/**
 * Props for the OrderSummary component.
 * @typedef {Object} OrderSummaryProps
 * @property {OrderSummaryData} data - The order summary data.
 * @property {(selected: boolean) => void} [onInsuranceChange] - Callback for insurance selection.
 */
interface OrderSummaryProps {
  data: OrderSummaryData
  onInsuranceChange?: (selected: boolean) => void
}

/**
 * OrderSummary component displays the breakdown of costs and fees.
 * @param {OrderSummaryProps} props - The component props.
 * @returns {JSX.Element} The rendered order summary.
 */
export function OrderSummary({ data }: OrderSummaryProps) {
  /**
   * Formats price in Naira currency.
   * @param {number} amount - The amount to format.
   * @returns {string} Formatted price string.
   */
  const formatPrice = (amount: number): string => {
    return `N${amount.toLocaleString()}`
  }

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-base">Subtotal</span>
          <span className="text-white text-base">{formatPrice(data.subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-base">Shipping</span>
          <span className="text-white text-base">{formatPrice(data.shipping)}</span>
        </div>

        {/* VAT */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-base">VAT</span>
          <span className="text-white text-base">{formatPrice(data.vat)}</span>
        </div>

        {/* Buyer Fee */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-base">Buyer Fee</span>
          <span className="text-white text-base">{formatPrice(data.buyerFee)}</span>
        </div>

        {/* Escrow Fee */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-base">Escrow Fee</span>
          <span className="text-white text-base">{formatPrice(data.escrowFee)}</span>
        </div>

        {/* Insurance */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-base">Insurance</span>
          <span className="text-white text-base">
            {data.insuranceSelected ? formatPrice(data.insuranceFee) : "Not selected"}
          </span>
        </div>
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

      {/* Total */}
      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-xl font-semibold">Total</span>
        </div>
        <div className="text-white text-2xl font-bold">{formatPrice(data.total)}</div>
      </div>
    </div>
  )
}
