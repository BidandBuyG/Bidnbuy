/**
 * type for order summary data.
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

export type OrderSummaryData = {
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

export type OrderSummaryProps = {
  data: OrderSummaryData
  onInsuranceChange?: (selected: boolean) => void
}
