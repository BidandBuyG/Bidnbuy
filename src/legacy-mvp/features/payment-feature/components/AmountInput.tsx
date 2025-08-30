/**
 * @file components/amount-input.tsx
 * @description Presentational component for the top-up amount input field.
 */

import type { AmountInputProps } from "../types/payment";


/**
 * AmountInput component provides a styled input field for entering the top-up amount.
 * @param {AmountInputProps} props - The component props.
 * @returns {JSX.Element} The rendered amount input field.
 */

const AmountInput = ({ value, onChange }: AmountInputProps) => {
  return (
    <div className="mb-8 w-full md:max-w-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Top-up Amount</h3>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#013139] w-full p-4 rounded-lg border border-[#00707B] text-white text-lg no-spinner"
        placeholder="Enter amount"
      />
    </div>
  )
}


export default AmountInput;