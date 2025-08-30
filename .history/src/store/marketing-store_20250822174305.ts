import { create } from "zustand"
import { persist } from "zustand/middleware"

export type MarketingStats = {
  totalSignups: number
  referralClicks: number
  rewardsEarned: number
}

export type Referral = {
  id: string
  name: string
  phone: string
  type: "buyer" | "vendor"
  date: string
  status: "rewarded" | "pending"
  email: string
}

export type OngoingAuction = {
  id: string
  title: string
  currentBid: number
  timeLeft: string
  image: string
}

type MarketingState = {
  stats: MarketingStats
  referrals: Referral[]
  ongoingAuctions: OngoingAuction[]
  referralLink: string

  // Actions
  setStats: (stats: MarketingStats) => void
  addReferral: (referral: Referral) => void
  updateReferral: (id: string, updates: Partial<Referral>) => void
  setOngoingAuctions: (auctions: OngoingAuction[]) => void
  incrementSignups: () => void
  incrementClicks: () => void
  addRewards: (amount: number) => void
}

export const useMarketingStore = create<MarketingState>()(
  persist(
    (set, get) => ({
      stats: {
        totalSignups: 46,
        referralClicks: 95,
        rewardsEarned: 5000,
      },
      referrals: [
        {
          id: "1",
          name: "John Doe",
          phone: "09077842900",
          type: "buyer",
          date: "01/03/26",
          status: "rewarded",
          email: "johndoe@gmail.com",
        },
        {
          id: "2",
          name: "Marylyn Kay",
          phone: "09077842900",
          type: "vendor",
          date: "01/03/26",
          status: "pending",
          email: "marylyn@gmail.com",
        },
        {
          id: "3",
          name: "Jane Doe",
          phone: "09077842900",
          type: "buyer",
          date: "01/03/26",
          status: "rewarded",
          email: "jane@gmail.com",
        },
        {
          id: "4",
          name: "Mary Jane",
          phone: "09077842900",
          type: "vendor",
          date: "01/03/26",
          status: "pending",
          email: "mary@gmail.com",
        },
      ],
      ongoingAuctions: [
        {
          id: "1",
          title: "Leather Jacket",
          currentBid: 10000,
          timeLeft: "12h",
          image: "/vintage-leather-jacket.png",
        },
        {
          id: "2",
          title: "Pure Luxury Hermes Slide",
          currentBid: 9000,
          timeLeft: "2h",
          image: "/ceramic-vase-flowers.png",
        },
      ],
      referralLink: "bidnbuyglobal.com/ref/012",

      setStats: (stats) => set({ stats }),

      addReferral: (referral) =>
        set((state) => ({
          referrals: [...state.referrals, referral],
        })),

      updateReferral: (id, updates) =>
        set((state) => ({
          referrals: state.referrals.map((referral) => (referral.id === id ? { ...referral, ...updates } : referral)),
        })),

      setOngoingAuctions: (auctions) => set({ ongoingAuctions: auctions }),

      incrementSignups: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            totalSignups: state.stats.totalSignups + 1,
          },
        })),

      incrementClicks: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            referralClicks: state.stats.referralClicks + 1,
          },
        })),

      addRewards: (amount) =>
        set((state) => ({
          stats: {
            ...state.stats,
            rewardsEarned: state.stats.rewardsEarned + amount,
          },
        })),
    }),
    {
      name: "marketing-storage",
    },
  ),
)
