/**
 * @file components/referral/referral-code-section.tsx
 * @description Component for displaying and sharing the user's referral code.
 */

import { useState } from "react"
import { Copy, Share } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import type { ReferralCodeSectionProps } from "../types/referrals"
import { handleShare } from "../utils"


export function ReferralCodeSection({ referralCode }: ReferralCodeSectionProps) {
 

  

  

  return (
    <div className="mb-8">
      <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
        {window.innerWidth < 768 ? "Your referral code" : "Your referral code"}
      </h2>

      {/* Referral Code Input */}
      <div className="relative mb-6">
        <div
          className="w-full p-4 rounded-lg border border-[#00707B] text-center"
          style={{ backgroundColor: "#013139" }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-lg font-mono">{referralCode}</span>
            <button
              onClick={handleCopy}
              disabled={isCopying}
              className="text-[#00707B] hover:text-[#00707B]/80 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleShare}
          className="flex-1 text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity py-3"
          style={{ backgroundColor: "#00707B" }}
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          onClick={handleCopy}
          disabled={isCopying}
          className="flex-1 text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity py-3"
          style={{ backgroundColor: "#00707B" }}
        >
          <Copy className="w-4 h-4 mr-2" />
          {isCopying ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  )
}
