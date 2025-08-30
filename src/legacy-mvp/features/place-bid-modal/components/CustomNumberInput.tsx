import type React from "react"
import { forwardRef } from "react"
import { Input } from "@/components/ui/input"

type CustomNumberInputProps = {
  value: number | ""
  onChange: (value: number | "") => void
  onBlur?: () => void
  placeholder?: string
  min?: number
  max?: number
  disabled?: boolean
  error?: boolean
}

/**
 * Custom Number Input Component
 *
 * A clean, sleek number input without increment/decrement buttons
 * Features:
 * - Clean design that matches the overall UI
 * - Numeric input validation
 * - Error state styling
 * - Proper formatting for currency values
 */

export const CustomNumberInput = forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({ value, onChange, onBlur, placeholder, min = 0, disabled, error }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/,/g, "")
      if (inputValue === "") {
        onChange("")
        return
      }
      const numericValue = Number(inputValue)
      if (!isNaN(numericValue)) {
        onChange(numericValue)
      }
    }

    const handleBlur = () => {
      if (value !== "" && min !== undefined && Number(value) < min) {
        onChange(min)
      }
      onBlur?.()
    }

    const displayValue = value === "" ? "" : Number(value).toLocaleString()

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">₦</div>
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`pl-8 text-white bg-[#00707B4D] border-slate-600/50 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20 ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
          }`}
        />
      </div>
    )
  }
)

CustomNumberInput.displayName = "CustomNumberInput"
