import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ProductInfoSection({ product }: { product: any }) {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-white">{product.name || "Hermes Birkin Bag"}</h1>
      <div className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "#39F0BC" }}>
        ₦{product.basePrice?.toLocaleString() || "200,000"}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-400 mb-1">Current Bid:</div>
          <div className="text-lg lg:text-xl font-bold" style={{ color: "#39F0BC" }}>
            ₦180,000
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Minimum Bid:</div>
          <div className="text-lg lg:text-xl font-bold" style={{ color: "#39F0BC" }}>
            ₦150,000
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-gray-300">3 bids</span>
        <div className="flex items-center gap-2 text-red-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Ends in: 2h 30m 56s</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-300 mb-3">Condition: New</div>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-teal-600 text-sm font-semibold">G</AvatarFallback>
          </Avatar>
          <span className="text-sm text-white font-medium">Genuine Seller</span>
        </div>
      </div>

      <Button className="w-full bg-teal-500 hover:bg-teal-400 cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition-colors">
        Place a Bid
      </Button>
    </div>
  )
}
