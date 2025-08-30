import EscrowSuccessIcon from "@/assets/escrow/escrow-success-icon.svg"

type EscrowPaymentReleasedMobileProps = {
  orderId: string
  onViewOrderDetails: () => void
  onReturnToOrders: () => void
}

export function EscrowPaymentReleasedMobile({
  // orderId,
  onViewOrderDetails,
  onReturnToOrders
}: EscrowPaymentReleasedMobileProps) {
  return (
    <div className="lg:hidden">
      <div
        className="rounded-lg p-6 mb-6 border"
        style={{
          backgroundColor: "#01212E",
          borderColor: "#00707B",
        }}
      >
        
        <div className="flex justify-center mb-6">
          <img src={EscrowSuccessIcon} alt="Success" width={48} height={48} className="object-contain" />
        </div>

        
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-3">Payment Released to Vendor</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your payment of ₦180,000 has been successfully received by Ginaluxury after confirmed delivery of Hermes
            birkin bag.
          </p>
        </div>
      </div>

   
      <div
        className="rounded-lg p-6 mb-8 border"
        style={{
          backgroundColor: "#01212E",
          borderColor: "#00707B",
        }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Item Delivered</span>
            <span className="text-sm text-white">Hermes Birkin Bag</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Vendor</span>
            <span className="text-sm text-white">Ginaluxury</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Amount Paid</span>
            <span className="text-sm text-white">₦180,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Delivery Date</span>
            <span className="text-sm text-white">22nd June 2025</span>
          </div>
        </div>
      </div>

   
      <div className="space-y-4">
        <button
          onClick={onViewOrderDetails}
          className="w-full py-4 rounded-lg text-white font-medium transition-all"
          style={{ backgroundColor: "#00707B" }}
        >
          View Order Details
        </button>

        <button
          onClick={onReturnToOrders}
          className="w-full py-2 text-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          Return to Orders
        </button>
      </div>
    </div>
  )
}