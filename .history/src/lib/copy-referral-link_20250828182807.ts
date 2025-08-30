import { toast } from "sonner"

export type EmptyReferralsProps = {
  referralLink: string
}

export const copyReferralLink = (referralLink) => {
    navigator.clipboard.writeText(`https://${referralLink}`)
    toast.success("Referral link copied to clipboard!")
  }
