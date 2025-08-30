import type { EscrowOrder, Step } from "@/types/escrow"

export type EscrowItemsReceivedProps = {
  escrowData: EscrowOrder
  orderId: string
  steps: Step[]
  isConfirming: boolean
  isReporting: boolean
  onConfirmSatisfaction: () => void
  onReportProblem: () => void
}