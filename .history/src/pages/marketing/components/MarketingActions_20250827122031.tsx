import { Link } from "react-router-dom"

import { UserPlus, Users, Clock, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"

type MarketingActionsProps = {
  onRegisterClick: () => void
}

const MarketingActions = ({ onRegisterClick }: MarketingActionsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
      <Button
        onClick={onRegisterClick}
        className="flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-[#004755] hover:bg-[#00707B] border-[#00707B] text-white"
      >
        <UserPlus className="w-6 h-6 md:w-8 md:h-8" />
        <span className="text-xs md:text-sm font-medium">Register User</span>
      </Button>

      <Link to="/marketing/referrals">
        <Button className="w-full flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-[#004755] hover:bg-[#00707B] border-[#00707B] text-white">
          <Users className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-xs md:text-sm font-medium">My Referrals</span>
        </Button>
      </Link>

      <Link to="/marketing/referrals">
        <Button className="flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-[#004755] hover:bg-[#00707B] border-[#00707B] text-white">
          <Clock className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-xs md:text-sm font-medium">Ongoing Auctions</span>
        </Button>
      </Link>

      <Link to="/wallet-ledger">
        <Button className="w-full flex flex-col items-center gap-2 h-auto py-4 md:py-6 bg-[#004755] hover:bg-[#00707B] border-[#00707B] text-white">
          <Wallet className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-xs md:text-sm font-medium">My Wallet</span>
        </Button>
      </Link>
    </div>
  )
}

export default MarketingActions;
