"use client"

import { ArrowLeft, Menu, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WithdrawalSuccess } from "@/components/withdraw/withdrawal-success"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WithdrawSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount")
  const transactionId = searchParams.get("txn")
  const newBalance = searchParams.get("balance")

  const handleBack = () => {
    router.push("/wallet-ledger")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#013139] to-[#001B1F]">
      {/* Header */}
      <header className="bg-[#00707B] px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Header */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="sm" onClick={handleBack} className="text-white p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-white text-xl font-semibold ml-4">Withdraw</h1>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm" className="text-white p-2 mr-2">
              <Menu className="w-6 h-6" />
            </Button>
            <Image src="/images/bidnbuy-logo.png" alt="BidnBuy" width={40} height={40} className="mr-4" />
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={handleBack} className="text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Wallet
              </Button>
              <span className="text-white text-xl font-semibold">Withdrawal Complete</span>
            </nav>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white p-2">
              <User className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white p-2">
              <Bell className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Desktop Breadcrumb */}
          <div className="hidden md:block mb-8">
            <nav className="text-gray-400 text-sm">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span>Withdraw</span>
              <span className="mx-2">/</span>
              <span className="text-white">Success</span>
            </nav>
          </div>

     
          <WithdrawalSuccess
            amount={amount || undefined}
            transactionId={transactionId || undefined}
            newBalance={newBalance || undefined}
          />
        </div>
      </main>
    </div>
  )
}
