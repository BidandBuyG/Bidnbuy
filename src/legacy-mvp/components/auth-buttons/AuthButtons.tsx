type AuthButtonsProps = {
  className?: string
}

export function AuthButtons({ className = "" }: AuthButtonsProps) {
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span className="text-gray-300">New here?</span>
      <button className="bg-transparent border border-[#00707B] text-white px-3 py-1.5 rounded text-sm hover:bg-[#00707B] transition-colors">
        Register
      </button>
      <span className="text-gray-400">or</span>
      <button className="bg-[#00707B] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#008a9a] transition-colors">
        Log In
      </button>
    </div>
  )
}
