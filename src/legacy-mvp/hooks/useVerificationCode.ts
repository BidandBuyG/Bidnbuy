import type React from "react"

import { useState, useRef, useCallback } from "react"

export function useVerificationCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) return 
      if (!/^\d*$/.test(value)) return 

      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input with a small delay to ensure the value is set
      if (value && index < 5) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus()
        }, 10)
      }
    },
    [code],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus()
        }, 10)
      }
    },
    [code],
  )

  const isCodeComplete = code.every((digit) => digit !== "")
  const codeString = code.join("")

  const resetCode = useCallback(() => {
    setCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }, [])

  return {
    code,
    inputRefs,
    handleInputChange,
    handleKeyDown,
    isCodeComplete,
    codeString,
    resetCode,
  }
}
