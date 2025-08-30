import type { OrderSummaryData } from "./types/cart";

export const formatPrice = (amount: number): string => {
    return `N${amount.toLocaleString()}`
  }
  
export const priceItems = (data: OrderSummaryData): PriceIte => [
  { label: "Subtotal", value: formatPrice(data.subtotal) },
  { label: "Shipping", value: formatPrice(data.shipping) },
  { label: "VAT", value: formatPrice(data.vat) },
  { label: "Buyer Fee", value: formatPrice(data.buyerFee) },
  { label: "Escrow Fee", value: formatPrice(data.escrowFee) },
  {
    label: "Insurance",
    value: data.insuranceSelected
      ? formatPrice(data.insuranceFee)
      : "Not selected",
  },
];