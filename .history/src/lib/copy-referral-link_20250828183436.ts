import { toast } from "sonner"



export const copyReferralLink = (referralLink: string) => {
    navigator.clipboard.writeText(`https://${referralLink}`)
    toast.success("Referral link copied to clipboard!")
  }
