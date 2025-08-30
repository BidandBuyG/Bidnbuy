type ProfileHeaderProps = {
  name: string;
  username: string;
  joinedDate: string;
  imageUrl: string;
};

const ProfileHeader = ({ name, username, joinedDate, imageUrl }: ProfileHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block mb-4">
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt="Profile"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
      <p className="text-gray-300 mb-1">@{username}</p>
      <p className="text-gray-400 text-sm">Joined {joinedDate}</p>
    </div>
  );
};

export default ProfileHeader;
