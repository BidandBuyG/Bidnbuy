import { mockAuctions } from "@/data/mockAuctions"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"


export const AuctionDataS

export type AuctionData = {
  id: string
  title: string
  currentBid: number
  minimumBid: number
  endTime: Date
  startTime: Date
  totalBids: number
  status: "upcoming" | "live" | "ended" | "extended"
}

export type BidHistoryItem = {
  id: string
  amount: number
  userId: string
  timestamp: Date
}


export type TimeLeft = {
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}


type ConnectionStatus = "connected" | "offline"


type AuctionState = {
 
  auction: AuctionData | null
  bidHistory: BidHistoryItem[]
  timeLeft: TimeLeft
  isOnline: boolean
  connectionStatus: ConnectionStatus
  extensionNotification: { seconds: number; timestamp: number } | null

  setAuction: (auction: AuctionData) => void
  updateAuctionData: (updates: Partial<AuctionData>) => void
  updateAuctionEndTime: (endTime: Date) => void
  setAuctionStatus: (status: AuctionData["status"]) => void
  updateTimeLeft: (time: TimeLeft) => void
  setOnlineStatus: (status: boolean) => void
  setConnectionStatus: (status: ConnectionStatus) => void
  addBidToHistory: (bid: BidHistoryItem) => void
  clearBidHistory: () => void
  setExtensionNotification: (seconds: number) => void
  clearExtensionNotification: () => void

  isAuctionEnded: () => boolean
  canPlaceBid: () => boolean
}


// const isIsoDateString = (value: any): boolean => {
//   return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
// }


// One-time localStorage cleanup to remove old/corrupted auction-store data
try {
  const raw = localStorage.getItem('auction-store')
  if (raw) {
    const parsed = JSON.parse(raw)
    if (parsed?.state?.auction && typeof parsed.state.auction.endTime === 'string') {
      localStorage.removeItem('auction-store')
      // Optionally, you can log or notify here
    }
  }
} catch (e) {}

export const useAuctionStore = create<AuctionState>()(
  devtools(
    persist(
      (set, get) => ({

        auctions: mockAuctions,
        filter: "All",
        
        auction: {
          id: "1",
          title: "Hermes Birkin Bag",
          currentBid: 180000,
          minimumBid: 150000,
          endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // Started 1 hour ago
          totalBids: 3,
          status: "live",
        },
        bidHistory: [
          {
            id: "1",
            amount: 180000,
            userId: "user1",
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
          },
          {
            id: "2",
            amount: 170000,
            userId: "user2",
            timestamp: new Date(Date.now() - 20 * 60 * 1000),
          },
        ],
        timeLeft: {
          hours: 2,
          minutes: 0,
          seconds: 0,
          totalMs: 2 * 60 * 60 * 1000,
        },
        isOnline: true,
        connectionStatus: "connected", 
        extensionNotification: null,

       
        setAuction: (auction) => set({ auction }),

        updateAuctionData: (updates) =>
          set((state) => ({
            auction: state.auction ? { ...state.auction, ...updates } : null,
          })),

        updateAuctionEndTime: (endTime) =>
          set((state) => ({
            auction: state.auction ? { ...state.auction, endTime } : null,
          })),

        setAuctionStatus: (status) =>
          set((state) => ({
            auction: state.auction ? { ...state.auction, status } : null,
          })),

        updateTimeLeft: (time) => set({ timeLeft: time }),

        setOnlineStatus: (status) => set({ isOnline: status }),
        setConnectionStatus: (status) => set({ connectionStatus: status }),

        addBidToHistory: (bid) =>
          set((state) => ({
            bidHistory: [bid, ...state.bidHistory].slice(0, 10),
          })),

        clearBidHistory: () => set({ bidHistory: [] }),

        setExtensionNotification: (seconds) =>
          set({
            extensionNotification: { seconds, timestamp: Date.now() },
          }),

        clearExtensionNotification: () => set({ extensionNotification: null }),

        // --- Computed Getters ---
        isAuctionEnded: () => {
          const state = get()
          // Auction is ended if its status is 'ended' OR if time has run out
          return (
            state.auction?.status === "ended" ||
            (state.timeLeft.hours === 0 && state.timeLeft.minutes === 0 && state.timeLeft.seconds === 0)
          )
        },

        canPlaceBid: () => {
          const state = get()
          // In demo mode, bidding is allowed if online and auction is live and not ended
          return state.isOnline && state.auction?.status === "live" && !state.isAuctionEnded()
        },



        setFilter: (filter: string) => set({ filter }),

        getFilteredAuctions: () => {
          const { auctions, filter } = get()

          if (filter === "All") return auctions

          return auctions.filter((auction) => {
            switch (filter) {
              case "Ending Soon":
                return auction.timeLeft.includes("h") && Number.parseInt(auction.timeLeft) <= 6
              case "New Listings":
                return true // Mock: all are considered new
              case "Popular":
                return auction.currentBid >= 8000
              case "Low Bids":
                return auction.currentBid < 5000
              case "High Value":
                return auction.currentBid >= 15000
              default:
                return auction.category.toLowerCase() === filter.toLowerCase()
            }
          })
        },

        joinBid: (auctionId: string, bidAmount: number) => {
          set((state) => ({
            auctions: state.auctions.map((auction) =>
              auction.id === auctionId ? { ...auction, currentBid: bidAmount } : auction,
            ),
          }))
        },


      }),
      {
        name: "auction-store",
        // Only persist auction data and bid history, not volatile connection status
        partialize: (state) => ({
          auction: state.auction,
          bidHistory: state.bidHistory,
        }),
        // Convert date strings back to Date objects after rehydration
        onRehydrateStorage: () => (state) => {
          if (state && state.auction) {
            if (typeof state.auction.endTime === "string") {
              state.auction.endTime = new Date(state.auction.endTime)
            }
            if (typeof state.auction.startTime === "string") {
              state.auction.startTime = new Date(state.auction.startTime)
            }
          }
          if (state && Array.isArray(state.bidHistory)) {
            state.bidHistory = state.bidHistory.map((bid) => ({
              ...bid,
              timestamp: typeof bid.timestamp === "string" ? new Date(bid.timestamp) : bid.timestamp,
            }))
          }
        },
      },
    ),
    {
      name: "auction-store",
    },
  ),
)
