import { useState } from "react"
import { toast } from "sonner"

const [isCopying, setIsCopying] = useState(false)
/**
 
   */
  export const handleCopy = async () => {
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
export const handleShare = async () => {
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