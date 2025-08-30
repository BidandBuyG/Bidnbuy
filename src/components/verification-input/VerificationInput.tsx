"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { forwardRef } from "react"

interface VerificationInputProps {
  value: string
  index: number
  onChange: (index: number, value: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent) => void
  className?: string
}

export const VerificationInput = forwardRef<HTMLInputElement, VerificationInputProps>(
  ({ value, index, onChange, onKeyDown, className }, ref) => {
    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        onKeyDown={(e) => onKeyDown(index, e)}
        className={className}
        autoComplete="off"
      />
    )
  },
)

VerificationInput.displayName = "VerificationInput"
