

export const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`)
    toast.success("Referral link copied to clipboard!")
  }
