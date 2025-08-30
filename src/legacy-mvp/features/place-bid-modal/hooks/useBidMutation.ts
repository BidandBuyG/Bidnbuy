import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuctionStore } from "@/store/auction-store" 

type BidData = {
  auctionId: string
  amount: number
}

type BidResponse = {
  success: boolean
  message: string
  newCurrentBid?: number
  newTotalBids?: number // Added to update total bids
}

const submitBid = async (bidData: BidData): Promise<BidResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate network error
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR")
  }

  // Simulate successful bid
  // In a real application, this would come from the server
  return {
    success: true,
    message: "Bid placed successfully",
    newCurrentBid: bidData.amount,
    newTotalBids: Math.floor(Math.random() * 10) + 1, // Simulate new total bids
  }
}

export const useBidMutation = () => {
  const queryClient = useQueryClient()
  const { updateAuctionData, addBidToHistory } = useAuctionStore() // Get actions from store

  return useMutation({
    mutationFn: submitBid,
    onSuccess: (data) => {
      // Invalidate and refetch auction data (good for real API)
      queryClient.invalidateQueries({ queryKey: ["auction"] })

      // Directly update Zustand store for immediate UI feedback
      if (data.newCurrentBid) {
        updateAuctionData({
          currentBid: data.newCurrentBid,
          totalBids: data.newTotalBids, // Update total bids
        })
        // Add the new bid to history for immediate display
        addBidToHistory({
          id: Date.now().toString(), // Unique ID for demo
          amount: data.newCurrentBid,
          userId: "You", // Or actual user ID if authenticated
          timestamp: new Date(),
        })
      }
    },
    onError: (error: Error) => {
      console.error("Bid submission failed:", error.message)
    },
  })
}
