import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { useMarketingStore } from "@/store/marketing-store"
import { toast } from "sonner"

export function ReferralsTable() {
  const { referrals, referralLink } = useMarketingStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "date" | "status">("date")
  const [filterBy, setFilterBy] = useState<"all" | "buyer" | "vendor" | "rewarded" | "pending">("all")

  const filteredReferrals = referrals
    .filter((referral) => {
      const matchesSearch =
        referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.phone.includes(searchTerm) ||
        referral.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter = filterBy === "all" || referral.type === filterBy || referral.status === filterBy

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`)
    toast.success("Referral link copied to clipboard!")
  }

  if (referrals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">No referrals yet.</h3>
          <p className="text-teal-200">Share your link to get started.</p>
        </div>

        <Card className="p-4 bg-[#00222E] border-teal-600/50 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-teal-200 text-sm truncate mr-3">{referralLink}</span>
            <Button onClick={copyReferralLink} size="sm" className="bg-teal-600 hover:bg-teal-500 text-white">
              Copy link
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300" />
          <Input
            placeholder="Search User"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#00222E] bg-[#00707B] text-white placeholder:text-teal-300"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortBy(sortBy === "name" ? "date" : "name")}
            className="bg-[#00707B] text-teal-300 hover:bg-teal-800 bg-[#00222E]"
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterBy(filterBy === "all" ? "buyer" : "all")}
            className="bg-[#00707B] text-teal-300 hover:bg-teal-800 bg-[#00222E]"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="text-white font-medium mb-2">All</div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card className="overflow-hidden bg-[#00222E] border-teal-600/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-teal-600/30">
                  <th className="text-left p-4 text-teal-200 font-medium">Name</th>
                  <th className="text-left p-4 text-teal-200 font-medium">Phone</th>
                  <th className="text-left p-4 text-teal-200 font-medium">Type</th>
                  <th className="text-left p-4 text-teal-200 font-medium">Date</th>
                  <th className="text-left p-4 text-teal-200 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-teal-600/20">
                    <td className="p-4 text-white">{referral.name}</td>
                    <td className="p-4 text-teal-200">{referral.phone}</td>
                    <td className="p-4">
                      <Badge
                        variant={referral.type === "buyer" ? "default" : "secondary"}
                        className={referral.type === "buyer" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"}
                      >
                        {referral.type}
                      </Badge>
                    </td>
                    <td className="p-4 text-teal-200">{referral.date}</td>
                    <td className="p-4">
                      <Badge
                        variant={referral.status === "rewarded" ? "default" : "secondary"}
                        className={
                          referral.status === "rewarded" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                        }
                      >
                        {referral.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredReferrals.map((referral) => (
          <Card key={referral.id} className="p-4 bg-[#00222E] border-teal-600/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{referral.name}</h3>
                <Badge
                  variant={referral.status === "rewarded" ? "default" : "secondary"}
                  className={referral.status === "rewarded" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}
                >
                  {referral.status}
                </Badge>
              </div>

              <div className="text-sm text-teal-200">
                <p>Phone: {referral.phone}</p>
                <p>Email: {referral.email}</p>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={referral.type === "buyer" ? "default" : "secondary"}
                  className={referral.type === "buyer" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"}
                >
                  {referral.type}
                </Badge>
                <span className="text-xs text-teal-300">{referral.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
