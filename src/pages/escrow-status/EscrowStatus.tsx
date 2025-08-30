import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useEscrowSocket } from "@/hooks/useEscrowSocket"
import { EscrowStatusMobile } from "./EscrowStatusMobile"
import { EscrowStatusDesktop } from "./EscrowStatusDesktop"
import type { EscrowState } from "@/types/escrow"
import type { EscrowOrder } from "@/types/escrow"

import { exploreEscrows } from "@/data/mockEscrowOrders"

import InEscrowSvg from "@/assets/escrow/in-escrow.svg"
import ItemsReceivedSvg from "@/assets/escrow/items-received.svg"
import ItemsReleasedSvg from "@/assets/escrow/funds-released.svg"
import ItemsRefundedSvg from "@/assets/escrow/funds-refunded.svg"





const EscrowStatus = () => {
  const navigate = useNavigate()
  const { orderId: paramOrderId } = useParams<{ orderId: string }>()
  const orderId = paramOrderId ?? "1"
  const [isConfirming, setIsConfirming] = useState(false)
  const [isReporting, setIsReporting] = useState(false)

  
  const escrowData = exploreEscrows.find((order: EscrowOrder) => order.id === orderId)
  if (!escrowData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#01151C] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the order you are looking for.</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const initialState: EscrowState = {
    orderStatus: "Pending",
    escrowStatus: "In Escrow",
    activeStep: 0,
    isItemReceived: false,
  }

  const { escrowState } = useEscrowSocket(orderId, initialState)

  
  const getLightIndicatorColor = (stepIndex: number) => {
    if (stepIndex === 0) {
      return "#1717D3"
    } else if (stepIndex === 1) {
      if (escrowState.activeStep >= 1) {
        return "#FFA500"
      }
      return "white"
    } else if (stepIndex === 2) {
      if (escrowState.activeStep >= 2) {
        return "#0AE023"
      }
      return "white"
    } else {
      return "white"
    }
  }

  const getStatusColor = () => {
    switch (escrowState.orderStatus) {
      case "Pending":
        return "#FFA500" 
      case "In Transit":
        return "#FFCC00" 
      case "Delivered":
      case "Received":
        return "#00707B" 
      default:
        return "#00707B"
    }
  }

  const getEscrowStatusButton = () => {
    if (escrowState.escrowStatus === "Funds Released") {
      return { text: "Funds Released", color: "#0AE023" }
    }
    return { text: "In Escrow", color: "#3B82F6" }
  }

  const steps = [
    { id: 1, title: "In Escrow", completed: true, active: escrowState.activeStep === 0, icon: InEscrowSvg },
    { id: 2, title: "Item Received", completed: escrowState.activeStep > 1, active: escrowState.activeStep === 1, icon: ItemsReceivedSvg },
    { id: 3, title: "Funds Released", completed: escrowState.activeStep > 2, active: escrowState.activeStep === 2, icon: ItemsReleasedSvg },
    { id: 4, title: "Funds Refunded", completed: false, active: escrowState.activeStep === 3, icon: ItemsRefundedSvg },
  ]

  const showActionButtons = escrowState.orderStatus === "Delivered" || escrowState.orderStatus === "Received"

  const handleConfirmSatisfaction = () => {
    setIsConfirming(true)
    setTimeout(() => {
      navigate(`/escrow/${orderId}/payment-released`)
    }, 3000)
  }

  const handleReportProblem = () => {
    setIsReporting(true)
    setTimeout(() => {
      navigate(`/escrow/${orderId}/report-problem`)
    }, 3000)
  }

  
  const sharedEscrowStatusProps = {
    escrowState,
    escrowData,
    steps,
    showActionButtons,
    isConfirming,
    isReporting,
    onConfirmSatisfaction: handleConfirmSatisfaction,
    onReportProblem: handleReportProblem,
    getLightIndicatorColor,
    getStatusColor,
    getEscrowStatusButton,
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#01151C" }}>
  
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">
          {showActionButtons ? "Item Received" : "Escrow Status"}
        </h1>
        
        
        <EscrowStatusMobile {...sharedEscrowStatusProps} />
        
    
        <EscrowStatusDesktop {...sharedEscrowStatusProps} />
      </div>
    </div>
  )
}

export default EscrowStatus;