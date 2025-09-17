import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MarketingStats = {
  totalSignups: number;
  referralClicks: number;
  rewardsEarned: number;
  currency: string;
  signupImages: string[];
  clicks: number;
  performance: { day: string; value: number }[];
};

export type Referral = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  address: string;
  state: string;
  nin: string;
  document: string;
  profileImg?: string;
  gender?: string;
  category?: string;
  phone?: string;
  // Optional fields for future use
  // date: string
  // status: "pending" | "rewarded"
};

export type OngoingAuction = {
  id: string;
  title: string;
  currentBid: number;
  timeLeft: string;
  image: string;
};

type MarketingState = {
  stats: MarketingStats;
  referrals: Referral[];
  ongoingAuctions: OngoingAuction[];
  referralLink: string;

  // Actions
  setStats: (stats: MarketingStats) => void;
  addReferral: (referral: Referral) => void;
  updateReferral: (id: string, updates: Partial<Referral>) => void;
  setOngoingAuctions: (auctions: OngoingAuction[]) => void;
  incrementSignups: () => void;
  incrementClicks: () => void;
  addRewards: (amount: number) => void;
};

export const useMarketingStore = create<MarketingState>()(
  persist(
    (set) => ({
      stats: {
        totalSignups: 46,
        referralClicks: 95,
        rewardsEarned: 456000,
        currency: "₦",
        signupImages: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=100&h=60&fit=crop",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=60&fit=crop",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=100&h=60&fit=crop",
        ], // Example array of images
        clicks: 95,
        performance: [
          { day: "M", value: 60 },
          { day: "T", value: 40 },
          { day: "W", value: 55 },
          { day: "T", value: 50 },
          { day: "F", value: 35 },
          { day: "S", value: 53 },
          { day: "S", value: 58 },
        ],
      },
      referrals: [
        {
          id: "4534",
          profileImg: "",
          firstName: "Angela",
          lastName: "Balogun",
          gender: "Female",
          phone: "+23456787545",
          email: "Sarahbalogun@gmail.com",
          category: "Vendor",
          description: "",
          address: "",
          state: "",
          nin: "",
          document: "",
        },
        {
          id: "4534",
          profileImg: "",
          firstName: "David",
          lastName: "Balogun",
          gender: "Male",
          phone: "+23456787545",
          email: "Davidbalogun@gmail.com",
          category: "Vendor",
          description: "",
          address: "",
          state: "",
          nin: "",
          document: "",
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
          referrals: state.referrals.map((referral) =>
            referral.id === id ? { ...referral, ...updates } : referral
          ),
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
    }
  )
);
