import { toast } from "sonner";

export function CustomToast({
  imageUrl,
  onViewUser,
  onAddAnother,
}: {
  imageUrl: string;
  onViewUser: () => void;
  onAddAnother: () => void;
}) {
  toast.custom((t) => (
    <div
      className="flex gap-4 items-center bg-[#0e6672] border border-white/30 rounded-xl px-6 py-4 shadow-lg h-[135px] min-w-[400px] w-[464.22px]"
      style={{ fontFamily: "inherit" }}
    >
      {/* Illustration */}
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt="User illustration"
          className="w-[88px] h-[88px] rounded-lg object-cover"
        />
      </div>
      {/* Text + actions */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white text-xl">User Created Successfully</span>
          <button
            className="ml-4 text-white text-xl hover:text-gray-200"
            onClick={() => toast.dismiss(t)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="text-white/70 text-[16px] mb-3">
          Your new user has been added to the system.
        </div>
        <div className="flex gap-4 mt-2">
          <button
            onClick={onViewUser}
            className="text-gray-200 font-semibold text-[16px] hover:underline"
          >
            View User
          </button>
          <button
            onClick={onAddAnother}
            className="text-white font-bold text-[16px] hover:underline"
          >
            Add Another
          </button>
        </div>
      </div>
    </div>
  ));
}

// Usage Example:
// showUserCreatedToast({
//   imageUrl: "/user-success-illustration.png",
//   onViewUser: () => { /* handle view user */ },
//   onAddAnother: () => { /* handle add another */ },
// });
