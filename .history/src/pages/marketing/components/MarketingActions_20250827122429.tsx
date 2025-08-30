import { Link } from "react-router-dom"

import { UserPlus, Users, Clock, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"

type MarketingActionsProps = {
  onRegisterClick: () => void
}

const MarketingActions = ({ onRegisterClick }: MarketingActionsProps) => {

  const actions = [
    {
      icon: UserPlus,
      label: "Register User",
      onClick: () => setShowRegisterModal(true),
    },
    {
      icon: Users,
      label: "My Referrals",
      href: "/marketing/referrals",
    },
    {
      icon: Clock,
      label: "Ongoing Auctions",
      href: "/auctions/ongoing",
    },
    {
      icon: Wallet,
      label: "My Wallet",
      href: "/wallet-ledger",
    },
  ]
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

      <Link to="/auctions/ongoing">
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


"use client"
import { Button } from "@/components/ui/button"
import { UserPlus, Users, Clock, Wallet } from "lucide-react"
import { useState } from "react"
import { RegisterUserModal } from "./register-user-modal"
import Link from "next/link"

export function MarketingActions() {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const actions = [
    {
      icon: UserPlus,
      label: "Register User",
      onClick: () => setShowRegisterModal(true),
    },
    {
      icon: Users,
      label: "My Referrals",
      href: "/marketing/referrals",
    },
    {
      icon: Clock,
      label: "Ongoing Auctions",
      href: "/auctions/ongoing",
    },
    {
      icon: Wallet,
      label: "My Wallet",
      href: "/wallet-ledger",
    },
  ]

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        {actions.map((action, index) => {
          const Icon = action.icon

          if (action.onClick) {
            return (
              <Button
                key={index}
                onClick={action.onClick}
                className="h-auto p-4 bg-teal-700 hover:bg-teal-600 text-white border-0 flex flex-col items-center gap-2"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-xs md:text-sm font-medium">{action.label}</span>
              </Button>
            )
          }

          return (
            <Link key={index} href={action.href!}>
              <Button className="w-full h-auto p-4 bg-teal-700 hover:bg-teal-600 text-white border-0 flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-xs md:text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>

      <RegisterUserModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
    </>
  )
}

