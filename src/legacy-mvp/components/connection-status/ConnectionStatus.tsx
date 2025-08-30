import { Wifi, WifiOff } from "lucide-react"
import { useAuctionStore } from "@/store/auction-store"

type ConnectionStatusProps = {
  productId: string
  className?: string
}

/**
 * Connection Status Component
 *
 * Displays the current network status to the user.
 * Always shows "Demo Mode" as WebSocket integration has been removed.
 */

export function ConnectionStatus({ className = "" }: ConnectionStatusProps) {
  const { isOnline } = useAuctionStore()

  // In this version, we always show "Demo Mode"
  // The `isOnline` status from the browser is still relevant for general network connectivity.
  
  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        text: "Offline",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
      }
    }
    return {
      icon: Wifi,
      text: "Demo Mode",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    }
  }

  const statusInfo = getStatusInfo()
  const IconComponent = statusInfo.icon

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Status indicator display */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusInfo.bgColor} ${statusInfo.borderColor}`}
      >
        <IconComponent className={`w-4 h-4 ${statusInfo.color}`} />
        <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.text}</span>
      </div>
    </div>
  )
}
