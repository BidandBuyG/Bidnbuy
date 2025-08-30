import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import type { EscrowOrder } from "@/types/escrow"

import { EscrowItemReceivedMobile } from "./EscrowItemsReceivedMobile"
import EscrowItemReceivedDesktop from "./EscrowItemsReceivedDesktop"

import { exploreEscrows } from "@/data/mockEscrowOrders"

import InEscrowSvg from "@/assets/escrow/in-escrow.svg"
import ItemsReceivedSvg from "@/assets/escrow/items-received.svg"
import ItemsReleasedSvg from "@/assets/escrow/funds-released.svg"
import ItemsRefundedSvg from "@/assets/escrow/funds-refunded.svg"



const EscrowItemReceived = () => {
  const { orderId: paramOrderId } = useParams<{ orderId: string }>()
  const orderId = paramOrderId ?? "1"
  const navigate = useNavigate()
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

  const steps = [
    { id: 1, title: "In Escrow", completed: true, active: false, icon: InEscrowSvg },
    { id: 2, title: "Item Received", completed: true, active: true, icon: ItemsReceivedSvg },
    { id: 3, title: "Funds Released", completed: false, active: false, icon: ItemsReleasedSvg },
    { id: 4, title: "Funds Refunded", completed: false, active: false, icon: ItemsRefundedSvg },

  ]

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

  const sharedEscrowItemReceivedProps = {
    escrowData,
    orderId,
    steps,
    isConfirming,
    isReporting,
    onConfirmSatisfaction: handleConfirmSatisfaction,
    onReportProblem: handleReportProblem,
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#01151C" }}>
     
    
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">Item Received</h1>
        <EscrowItemReceivedMobile {...sharedEscrowItemReceivedProps} />
        <EscrowItemReceivedDesktop {...sharedEscrowItemReceivedProps} />
      </div>
    </div>
  )
}

export default EscrowItemReceived;