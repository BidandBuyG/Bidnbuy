import type React from "react"

/**
 * Type for a single payment method.
 * @typedef {Object} PaymentMethod
 * @property {string} id - Unique identifier for the payment method.
 * @property {string} name - Display name of the payment method.
 * @property {string} description - Short description of the payment method.
 * @property {React.ElementType} icon - Lucide React icon component for the method.
 */

export type PaymentMethod = {
  id: string
  name: string
  description: string
  icon: React.ElementType
}

/**
 * Props for the PaymentMethodSelector component.
 * @typedef {Object} PaymentMethodSelectorProps
 * @property {string} selectedPayment - The ID of the currently selected payment method.
 * @property {(id: string) => void} onSelectPayment - Callback function when a payment method is selected.
 */

export type PaymentMethodSelectorProps = {
  selectedPayment: string
  onSelectPayment: (id: string) => void
}


/**
 * Props for the AmountInput component.
 * @typedef {Object} AmountInputProps
 * @property {string} value - The current value of the input field.
 * @property {(value: string) => void} onChange - Callback function when the input value changes.
 */

export type AmountInputProps = {
  value: string
  onChange: (value: string) => void
}