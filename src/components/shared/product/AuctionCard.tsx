type AuctionItem = {
  image: string
  title: string
  currentBid: string
  timeRemaining: string
  bidCount: number
  actionType: "bid" | "buy_now" | "watch"
  isHot?: boolean
  isClosingSoon?: boolean
}

export function AuctionItemCard({
  image,
  title,
  currentBid,
  timeRemaining,
  bidCount,
}: AuctionItem) {
  return (
    <div className="bg-[#00222E] rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img
          src={image || "/placeholder.svg?height=200&width=200"}
          alt={title}
          width={200}
          height={200}
          className="w-full h-32 lg:h-40 object-cover"
        />
        
        {/* Heart icon for wishlist - positioned in top right */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="p-3">
        {/* Product title */}
        <h3 className="text-sm font-medium text-white mb-2 line-clamp-1">{title}</h3>
        
        {/* Current bid in green/teal color */}
        <div className="text-[#00d4aa] font-bold text-base mb-1">{currentBid}</div>
        
        {/* Bid count */}
        <div className="text-gray-400 text-xs mb-1">{bidCount} bids</div>
        
        {/* Time remaining */}
        <div className="text-gray-400 text-xs mb-3">{timeRemaining}</div>
        
        {/* Action buttons row - wider buttons at both ends */}
        <div className="flex gap-2">
          {/* Wider Bid button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-6 py-2 rounded transition-colors flex-1">
            Bid
          </button>
          
          {/* Wider Buy button */}
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-6 py-2 rounded transition-colors flex-1 flex items-center justify-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z" />
            </svg>
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}
