import { useEffect } from "react"
import { Clock } from "lucide-react"
import { useAuctionStore, type TimeLeft } from "@/store/auction-store" 
import CountdownDisplay from "@/pages/auction-product-detail/components/CountdownDisplay"

type CountdownTimerProps = {
  className?: string
  showIcon?: boolean
  timeLeft: TimeLeft 
  isAuctionEnded: boolean 
}

/**
 * Countdown Timer Component
 *
 * Displays the time remaining in an auction with:
 * - Real-time updates every second
 * - Proper formatting (HH:MM:SS)
 * - Visual indicators for different states
 * - Automatic handling of auction end
 */

export function CountdownTimer({ className = "", showIcon = true, timeLeft, isAuctionEnded }: CountdownTimerProps) {
  const { auction, extensionNotification, clearExtensionNotification } = useAuctionStore()

  // Auto-clear extension notification after 3 seconds
  useEffect(() => {
    if (extensionNotification) {
      const timer = setTimeout(() => {
        clearExtensionNotification()
      }, 3000)

      return (() => clearTimeout(timer))
    }
  }, [extensionNotification, clearExtensionNotification])

  if (!auction) {
    return (
      <div className={`flex items-center gap-2 text-gray-400 ${className}`}>
        {showIcon && <Clock className="w-4 h-4" />}
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  const getTimerColor = () => {
    if (isAuctionEnded) return "text-red-400"
    if (timeLeft.totalMs < 5 * 60 * 1000) return "text-orange-400" 
    if (timeLeft.totalMs < 30 * 60 * 1000) return "text-yellow-400" 
    return "text-red-400" 
  }

  const getStatusText = () => {
    if (isAuctionEnded) return "Ended in: 0h 0m 0s"
    return `Ends in:`
    // return `Ends in: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center gap-2 ${getTimerColor()}`}>
        {showIcon && <Clock className="w-4 h-4" />}
        <span className="text-sm font-medium">{getStatusText()}</span>
      </div>

      
      {extensionNotification && (
        <div className="absolute top-full left-0 mt-2 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium animate-pulse">
          Auction Extended by {extensionNotification.seconds} seconds!
        </div>
      )}

     
      <CountdownDisplay
        hours={timeLeft.hours}
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
        colorClass={getTimerColor()}
      />

    </div>
  )
}
