/**
 * VendorProfile component displays vendor information (shown only on mobile for vendor ratings).
 * @param {VendorProfileProps} props - The component props.
 * @returns {JSX.Element} The rendered vendor profile.
 */

import type { VendorProfileProps } from "../types/reviews-and-ratings";

const VendorProfile = ({ vendor }: VendorProfileProps) => {
  return (
    <div className="md:hidden flex items-center gap-3 mb-6">
      <img
        src={vendor.avatar || "/placeholder.svg"}
        alt={`${vendor.name}'s avatar`}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <div>
        <p className="text-white text-base font-semibold">{vendor.name}</p>
        <p className="text-gray-400 text-sm">{vendor.email}</p>
      </div>
    </div>
  )
}


export default VendorProfile;