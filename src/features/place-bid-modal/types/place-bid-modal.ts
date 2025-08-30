export type PlaceBidModalProps = {
  isOpen: boolean
  auction: any
  timeLeft: any
  canBid: boolean
  auctionEnded: boolean
  isProcessing: boolean
  isSuccess: boolean
  isError: boolean
  errorMessageFromMutation?: string
  displayErrorMessage?: string | null
  bidAmount: number
  agreedToTerms: boolean
  errors: Record<string, any>
  isValid: boolean
  setValue: (...args: any[]) => void
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  handleClose: () => void
}