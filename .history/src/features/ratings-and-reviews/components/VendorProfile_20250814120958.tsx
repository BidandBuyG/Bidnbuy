/**
 * Types for vendor profile data.
 * @typedef {Object} VendorProfile
 * @property {string} name - Vendor's name.
 * @property {string} email - Vendor's email address.
 * @property {string} avatar - URL to vendor's avatar image.
 */

type VendorProfile = {
  name: string
  email: string
  avatar: string
}

/**
 * Props for the VendorProfile component.
 * @typedef {Object} VendorProfileProps
 * @property {VendorProfile} vendor - The vendor profile data.
 */

type VendorProfileProps {
  vendor: VendorProfile
}

/**
 * VendorProfile component displays vendor information (shown only on mobile for vendor ratings).
 * @param {VendorProfileProps} props - The component props.
 * @returns {JSX.Element} The rendered vendor profile.
 */
const VendorProfile = ({ vendor }: VendorProfileProps) => {
  return (
    <div className="md:hidden flex items-center gap-3 mb-6">
      <Image
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