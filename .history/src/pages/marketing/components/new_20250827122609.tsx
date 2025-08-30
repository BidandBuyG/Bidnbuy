"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, Gavel } from "lucide-react"
import Link from "next/link"

export function OngoingAuctions() {
  const mockAuctions = [
    {
      id: "1",
      title: "Vintage Leather Jacket",
      currentBid: "₦15,000",
      timeLeft: "2h 30m",
      bidders: 12,
    },
    {
      id: "2",
      title: "Designer Watch",
      currentBid: "₦45,000",
      timeLeft: "5h 15m",
      bidders: 8,
    },
    {
      id: "3",
      title: "Ceramic Vase",
      currentBid: "₦8,500",
      timeLeft: "1h 45m",
      bidders: 15,
    },
  ]

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
          <Gavel className="h-5 w-5 text-teal-400" />
          Ongoing Auctions
        </CardTitle>
        <Link href="/auctions/ongoing">
          <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300 hover:bg-slate-700/50">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAuctions.map((auction) => (
          <div
            key={auction.id}
            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm mb-1">{auction.title}</h4>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="text-teal-400 font-medium">{auction.currentBid}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {auction.timeLeft}
                </span>
                <span>{auction.bidders} bidders</span>
              </div>
            </div>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs px-3 py-1">
              Bid Now
            </Button>
          </div>
        ))}

        {mockAuctions.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <Gavel className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No ongoing auctions at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
