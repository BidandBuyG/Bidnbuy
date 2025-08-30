/**
 * @file components/wallet-ledger/user-profile.tsx
 * @description Presentational component for displaying user profile information on the wallet ledger page.
 */


/**
 * Props for the UserProfile component.
 * @typedef {Object} UserProfileProps
 * @property {string} name - The user's name.
 * @property {string} handle - The user's handle (e.g., @username).
 * @property {string} avatarSrc - Source URL for the user's avatar image.
 */

type UserProfileProps = {
  name: string
  handle: string
  avatarSrc: string
}

/**
 * UserProfile component displays the user's avatar, name, and handle.
 * @param {UserProfileProps} props - The component props.
 * @returns {JSX.Element} The rendered user profile section.
 */

const UserProfile = ({ name, handle, avatarSrc }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <img
        src={avatarSrc || "/placeholder.svg"} 
        alt={`${name}'s avatar`}
        width={64}
        height={64}
        className="rounded-full object-cover"
      />
      <div>
        <p className="text-white text-xl font-semibold">Hello, {name}</p>
        <p className="text-gray-300 text-base">{handle}</p>
      </div>
    </div>
  )
}

export default UserProfile;
