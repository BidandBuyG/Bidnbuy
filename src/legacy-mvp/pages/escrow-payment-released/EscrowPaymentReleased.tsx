import { useNavigate, useParams } from "react-router-dom"

import { exploreEscrows } from "@/data/mockEscrowOrders"

import { EscrowPaymentReleasedMobile } from "./EscrowPaymentReleasedMobile"
import EscrowPaymentReleasedDesktop from "./EscrowPaymentReleasedDesktop"
import type { EscrowOrder } from "@/types/escrow"



const EscrowPaymentReleased = () => {
  const navigate = useNavigate()
  const { orderId: paramOrderId } = useParams<{ orderId: string }>()
  const orderId = paramOrderId ?? "1"


  const escrowData = exploreEscrows.find((order: EscrowOrder) => order.id === orderId)
  if (!escrowData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#01151C] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the order you are looking for.</p>
          <button
            className="bg-[#00707B] cursor-pointer text-white px-4 py-2 rounded transition-all"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }
  
  const handleViewOrderDetails = () => {
    alert("Navigating to order details...")
  }

  const handleReturnToOrders = () => {
    navigate("/escrow")
  }

  const sharedEscrowPaymentReleasedProps = {
    orderId,
    onViewOrderDetails: handleViewOrderDetails,
    onReturnToOrders: handleReturnToOrders,
  }


  return (
    <div className="min-h-screen text-white pb-4" style={{ backgroundColor: "#01151C" }}>
    
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold mb-8">Escrow Released</h1>
        
       
        <EscrowPaymentReleasedMobile {...sharedEscrowPaymentReleasedProps} />
        
     
        <EscrowPaymentReleasedDesktop {...sharedEscrowPaymentReleasedProps} />
      </div>
    </div>
  )
}

export default EscrowPaymentReleased;