import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { VerificationInput } from "../verification-input/VerificationInput"
import { useVerificationCode } from "@/hooks/useVerificationCode"

type VerificationFormProps = {
  onSubmit: (code: string) => Promise<void>
  isSubmitting: boolean
  isMobile?: boolean
}

export function VerificationForm({ onSubmit, isSubmitting, isMobile = false }: VerificationFormProps) {
  const { code, inputRefs, handleInputChange, handleKeyDown, isCodeComplete, codeString } = useVerificationCode()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCodeComplete) return
    await onSubmit(codeString)
  }

  const inputClassName = isMobile
    ? "w-12 h-12 text-center text-lg font-semibold bg-teal-800/30 border-teal-700/50 text-white focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/40 rounded-lg transition-colors"
    : "w-16 h-16 text-center text-xl font-semibold bg-teal-700/30 border-teal-600/50 text-white focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/40 rounded-lg transition-colors"

  const buttonClassName = isMobile
    ? `w-full h-12 rounded-xl font-medium transition-all ${
        isCodeComplete && !isSubmitting
          ? "bg-teal-600 hover:bg-teal-700 text-white"
          : "bg-teal-800/30 text-gray-500 cursor-not-allowed"
      }`
    : `w-116 h-14 rounded-lg font-medium text-lg transition-all ${
        isCodeComplete && !isSubmitting
          ? "bg-teal-600 hover:bg-teal-700 text-white"
          : "bg-teal-700/40 text-gray-400 cursor-not-allowed"
      }`

  return (
    <form onSubmit={handleSubmit}>
      <div className={isMobile ? "mb-8" : "mb-16"}>
        <label
          className="block text-white text-[21px] font-medium mb-8 text-center"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Email Verification Code
        </label>

        <div className={`flex ${isMobile ? "gap-3 justify-center" : "gap-4 justify-center"} mb-4`}>
          {code.map((digit: string, index: number) => (
            <VerificationInput
              key={index}
              ref={(el) => {inputRefs.current[index] = el}}
              value={digit}
              index={index}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={inputClassName}
            />
          ))}
        </div>

        

        <div className={isMobile ? "" : "flex justify-center"}>

        <Button
          type="submit"
          className={buttonClassName}
          disabled={!isCodeComplete || isSubmitting}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {isSubmitting ? "Verifying..." : "Proceed"}
          <ArrowRight className={`ml-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
        </Button>
        </div>
      </div>
    </form>
  )
}
