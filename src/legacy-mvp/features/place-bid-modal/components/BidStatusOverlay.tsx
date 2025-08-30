import { X } from "lucide-react"

type BidStatusOverlayProps= {
  isProcessing: boolean
  isSuccess: boolean
  onClose: () => void
  isMobile?: boolean
}

export function BidStatusOverlay({ isProcessing, isSuccess, onClose, isMobile = false }: BidStatusOverlayProps) {
  if (isProcessing) {
    return (
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${
          isMobile ? "flex items-center justify-center" : "rounded-2xl flex items-center justify-center"
        }`}
      >
        <div className="bg-slate-800 rounded-xl p-6 max-w-sm w-full mx-4 border border-slate-700/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Your bid is being processed</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-300 text-sm mb-4">We are working on submitting your bid. This may take a moment.</p>
          <div className="mb-2">
            <div className="text-sm text-gray-400 mb-1">Submitting bid</div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div
        className={`absolute ${
          isMobile ? "bottom-4 left-4 right-4" : "inset-0 rounded-2xl flex items-center justify-center"
        } bg-black/50 backdrop-blur-sm`}
      >
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/30">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Bid Placed</h3>
              <p className="text-gray-300 text-sm">
                You are currently the highest bidder. We'll notify you, if you were outbid.
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
