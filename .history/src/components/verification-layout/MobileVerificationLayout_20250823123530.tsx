import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

import BidnBuyLogo from "@/assets/bidnbuy-logo.png"
import { VerificationForm } from "../forms/VerificationForm"

interface MobileVerificationLayoutProps {
  onSubmit: (code: string) => Promise<void>
  isSubmitting: boolean
  onBack?: () => void
}

export function MobileVerificationLayout({ onSubmit, isSubmitting, onBack }: MobileVerificationLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:hidden bg-[#01151C]" style={{ backgroundColor: "#075D66" }}>
      
      <div className="flex items-center justify-start p-4 pt-12">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <img src={BidnBuyLogo} alt="Bid and Buy Logo" width={150} height={150} className="object-contain" />
        </div>
      </div>

   
      <div className="flex-1 rounded-t-3xl px-6 py-8 bg-[#01151C]">
        <div className="max-w-sm mx-auto">
          <h1
            className="text-2xl font-medium text-white mb-3 text-left whitespace-nowrap"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Account Verification Requirements
          </h1>

          <p className="text-gray-300 mb-8 text-left text-18" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Verify your email with the code sent to you.
          </p>

          <VerificationForm onSubmit={onSubmit} isSubmitting={isSubmitting} isMobile={true} />
        </div>
      </div>
    </div>
  )
}
