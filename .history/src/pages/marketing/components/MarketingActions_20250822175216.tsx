import { UserPlus, Users, Clock, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

type MarketingActionsProps = {
  onRegisterClick: () => void
}

const MarketingActions = ({ onRegisterClick }: MarketingActionsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
      <Button
        onClick={onRegisterClick}
        className="flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-teal-700 hover:bg-teal-600 text-white"
      >
        <UserPlus className="w-6 h-6 md:w-8 md:h-8" />
        <span className="text-xs md:text-sm font-medium">Register User</span>
      </Button>

      <Link to="/marketing/referrals">
        <Button className="w-full flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-teal-700 hover:bg-teal-600 text-white">
          <Users className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-xs md:text-sm font-medium">My Referrals</span>
        </Button>
      </Link>

      <Button className="flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-teal-700 hover:bg-teal-600 text-white">
        <Clock className="w-6 h-6 md:w-8 md:h-8" />
        <span className="text-xs md:text-sm font-medium">Ongoing Auctions</span>
      </Button>

      <Link to="/wallet-ledger">
        <Button className="w-full flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-teal-700 hover:bg-teal-600 text-white">
          <Wallet className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-xs md:text-sm font-medium">My Wallet</span>
        </Button>
      </Link>
    </div>
  )
}

export default MarketingActions;
