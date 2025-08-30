import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import { copyReferralLink } from "@/lib/copy-referral-link"

type EmptyReferralsProps = {
  referralLink: string
}

const EmptyReferrals = ({ referralLink }: EmptyReferralsProps) => {
  // const copyReferralLink = () => {
  //   navigator.clipboard.writeText(`https://${referralLink}`)
  //   toast.success("Referral link copied to clipboard!")
  // }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300" />
          <Input
            placeholder="Search User"
            className="pl-10 bg-[#00222E] border-[#00707B] text-white placeholder:text-teal-300"
            disabled
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#00707B] text-teal-300 hover:bg-teal-800 bg-[#00222E]"
            disabled
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-[#00707B] text-teal-300 hover:bg-teal-800 bg-[#00222E]"
            disabled
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="text-white font-medium mb-2">All</div>

      {/* Empty State */}
      <div className="text-center py-12">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">No referrals yet.</h3>
          <p className="text-teal-200">Share your link to get started.</p>
        </div>

        <Card className="p-4 bg-[#00222E] border-[#00707B]/50 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-teal-200 text-sm truncate mr-3">{referralLink}</span>
            <Button onClick={copyReferralLink} size="sm" className="bg-teal-600 hover:bg-teal-500 text-white">
              Copy link
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}


export default EmptyReferrals;
