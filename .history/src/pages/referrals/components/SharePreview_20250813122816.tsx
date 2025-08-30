"use client"

/**
 * @file components/referral/share-preview.tsx
 * @description Component for displaying a preview of the share message (desktop only).
 */

/**
 * Props for the SharePreview component.
 * @typedef {Object} SharePreviewProps
 * @property {string} referralCode - The user's referral code.
 */
interface SharePreviewProps {
  referralCode: string
}

/**
 * SharePreview component displays a preview of how the referral message will look when shared.
 * Only shown on desktop.
 * @param {SharePreviewProps} props - The component props.
 * @returns {JSX.Element} The rendered share preview section.
 */

const SharePreview = ({ referralCode }: SharePreviewProps) => {
  return (
    <div className="hidden md:block">
      <h2 className="text-white text-xl font-semibold mb-6">Share preview</h2>
      <div className="p-4 rounded-lg border border-[#00707B]" style={{ backgroundColor: "#013139" }}>
        <p className="text-gray-300 text-base">
          Use my referral code <span className="text-white font-semibold">{referralCode}</span> to get a discount on
          your first purchase. Sign up now!
        </p>
      </div>
    </div>
  )
}


export default SharePreview
