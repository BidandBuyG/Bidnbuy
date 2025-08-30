/**
 * @file components/payment-method-selector.tsx
 * @description Presentational component for selecting a payment method.
 * Displays wallet and Paystack options with custom radio buttons.
 */

import { Wallet, CreditCard } from "lucide-react"
import type { PaymentMethod, PaymentMethodSelectorProps } from "../../../pages/add-bid-credit/types/add-bid-credit"

/**
 * PaymentMethodSelector component allows users to choose between different payment options.
 * @param {PaymentMethodSelectorProps} props - The component props.
 * @returns {JSX.Element} The rendered payment method selector.
 */


const PaymentMethodSelector = ({ selectedPayment, onSelectPayment }: PaymentMethodSelectorProps) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "wallet",
      name: "Wallet",
      description: "Available balance: N1,250",
      icon: Wallet,
    },
    {
      id: "paystack",
      name: "Paystack",
      description: "Pay with bank transfer",
      icon: CreditCard,
    },
  ]

  return (
    <div className="mb-8 md:max-w-lg">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">Select Payment Method</h2>
      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border border-[#00707B]"
              onClick={() => onSelectPayment(method.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">{method.name}</h3>
                  <p className="text-gray-300 text-sm">{method.description}</p>
                </div>
              </div>
              <div className="relative">
                <div
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedPayment === method.id ? "border-[#00707B] bg-[#00707B]" : "border-[#00707B]"
                  }`}
                >
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PaymentMethodSelector;
