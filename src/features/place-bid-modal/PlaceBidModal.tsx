
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuctionStore } from "@/store/auction-store"
import { useBidMutation } from "./hooks/useBidMutation"
import { createBidValidation, type BidFormData } from "./schema/bid-schema"

import { DesktopPlaceBidModal } from "./components/DesktopPlaceBidModal"
import { MobilePlaceBidModal } from "./components/MobilePlaceBidModal"
import { useEffect } from "react"
import { calculateTimeLeft } from "@/lib/calculate-time"


type PlaceBidModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function PlaceBidModal({ isOpen, onClose }: PlaceBidModalProps) {
  const { auction, canPlaceBid, isAuctionEnded, timeLeft } = useAuctionStore()
  const updateTimeLeft = useAuctionStore((s) => s.updateTimeLeft)
  const bidMutation = useBidMutation()

  const validationSchema = createBidValidation(
    auction?.currentBid ?? 180000,
    auction?.minimumBid ?? 150000
  )

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<BidFormData>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      bidAmount: 0,
      agreedToTerms: false,
    },
  })


  // Update countdown timer when modal is open
  useEffect(() => {
    if (!isOpen || !auction) return;
    const interval = setInterval(() => {
      updateTimeLeft(calculateTimeLeft(new Date(auction.endTime)))
    }, 1000)
    // Set initial time left immediately
    updateTimeLeft(calculateTimeLeft(new Date(auction.endTime)))
    return () => clearInterval(interval)
  }, [isOpen, auction, updateTimeLeft])

  if (!isOpen || !auction) return null

  const bidAmount = watch("bidAmount")
  const agreedToTerms = watch("agreedToTerms")

  const onSubmit = async (data: BidFormData) => {
    if (!auction || !canPlaceBid()) return
    try {
      await bidMutation.mutateAsync({
        auctionId: auction.id,
        amount: data.bidAmount,
      })
    } catch (error) {
      console.error("Bid submission failed:", error)
    }
  }

  const handleClose = () => {
    reset()
    bidMutation.reset()
    onClose()
  }

  const auctionEnded = isAuctionEnded()
  const canBid = canPlaceBid()
  const isProcessing = bidMutation.isPending
  const isSuccess = bidMutation.isSuccess
  const isError = bidMutation.isError
  const errorMessageFromMutation = bidMutation.error?.message

  const getErrorMessage = () => {
    if (auctionEnded) {
      return "The auction has ended. Bids are no longer accepted."
    }
    if (!canBid && !isProcessing && !isSuccess) {
      return "Bidding is currently unavailable. Please check auction status."
    }
    if (isError && errorMessageFromMutation === "NETWORK_ERROR") {
      return "Network error: Please check your internet connection."
    }
    return null
  }

  const displayErrorMessage = getErrorMessage()

  
  const modalProps = {
    isOpen,
    auction,
    timeLeft,
    canBid,
    auctionEnded,
    isProcessing,
    isSuccess,
    isError,
    errorMessageFromMutation,
    displayErrorMessage,
    bidAmount,
    agreedToTerms,
    errors,
    isValid,
    setValue,
    onSubmit: handleSubmit(onSubmit),
    handleClose,
  }

  return (
    <>
      <DesktopPlaceBidModal {...modalProps} />
      <MobilePlaceBidModal {...modalProps} />
    </>
  )
}
