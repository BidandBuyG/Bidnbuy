/**
 * @file components/referral/referral-code-section.tsx
 * @description Component for displaying and sharing the user's referral code.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Share } from "lucide-react"
import { toast } from "sonner"

/**
 * Props for the ReferralCodeSection component.
 * @typedef {Object} ReferralCodeSectionProps
 * @property {string} referralCode - The user's referral code.
 */

type ReferralCodeSectionProps = {
  referralCode: string
}

/**
 * ReferralCodeSection component displays the referral code with copy and share functionality.
 * @param {ReferralCodeSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered referral code section.
 */

export function ReferralCodeSection({ referralCode }: ReferralCodeSectionProps) {
 
  const [isCopying, setIsCopying] = useState(false)

  /**
   * Handles copying the referral code to clipboard.
   */
  const handleCopy = async () => {
    try {
      setIsCopying(true)
      await navigator.clipboard.writeText(referralCode)
      toast("Referral code copied to clipboard.")
    } catch (error) {
      toast.error("Failed to copy referral code.")
    } finally {
      setTimeout(() => setIsCopying(false), 1000)
    }
  }

  /**
   * Handles sharing the referral code using Web Share API or fallback.
   */
  const handleShare = async () => {
    const shareData = {
      title: "Join BidnBuy with my referral code!",
      text: `Use my referral code ${referralCode} to get a discount on your first purchase. Sign up now!`,
      url: window.location.origin,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy share text to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
        toast.success("Share message copied to clipboard.")
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast.error("Failed to share referral code.")
    }
  }

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
