import { toast } from "sonner"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { RegisterUserFormData } from "@/lib/validation/marketing-schema"
import { useMarketingStore } from "@/store/marketing-store"

// Mock API functions
const registerUser = async (data: RegisterUserFormData): Promise<{ success: boolean; id: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate success/failure
  if (Math.random() > 0.1) {
    return { success: true, id: Math.random().toString(36).substr(2, 9) }
  } else {
    throw new Error("Registration failed. Please try again.")
  }
}

const fetchMarketingStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    totalSignups: 46,
    referralClicks: 95,
    rewardsEarned: 5000,
  }
}

const fetchReferrals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    {
      id: "1",
      name: "John Doe",
      phone: "09077842900",
      type: "buyer" as const,
      date: "01/03/26",
      status: "rewarded" as const,
      email: "johndoe@gmail.com",
    },
    {
      id: "2",
      name: "Marylyn Kay",
      phone: "09077842900",
      type: "vendor" as const,
      date: "01/03/26",
      status: "pending" as const,
      email: "marylyn@gmail.com",
    },
  ]
}

export const useRegisterUser = () => {
  const queryClient = useQueryClient()
  const { addReferral, incrementSignups, addRewards } = useMarketingStore()

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (result, variables) => {
      // Add to store
      addReferral({
        id: result.id,
        name: variables.name,
        phone: variables.phoneNumber,
        type: variables.category,
        date: new Date().toLocaleDateString("en-GB"),
        status: "pending",
        email: variables.emailAddress,
      })

      // Update stats
      incrementSignups()
      addRewards(100) // Reward for successful referral

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["marketing-stats"] })
      queryClient.invalidateQueries({ queryKey: ["referrals"] })

      toast.success("User registered successfully!")
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed")
    },
  })
}

export const useMarketingStats = () => {
  return useQuery({
    queryKey: ["marketing-stats"],
    queryFn: fetchMarketingStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useReferrals = () => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
