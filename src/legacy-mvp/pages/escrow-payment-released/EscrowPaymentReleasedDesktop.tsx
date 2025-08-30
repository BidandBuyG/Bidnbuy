import EscrowSuccessIcon from "@/assets/escrow/escrow-success-icon.svg"

type PaymentReleasedDesktopProps = {
  orderId: string
  onViewOrderDetails: () => void
  onReturnToOrders: () => void
}

const EscrowPaymentReleasedDesktop = ({
  // orderId,
  onViewOrderDetails,
  onReturnToOrders
}: PaymentReleasedDesktopProps) => {
  return (
    <div className="hidden lg:block">
      <div className="flex gap-8 mb-8">

        <div className="flex-1">
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: "#01212E",
              borderColor: "#00707B",
            }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={EscrowSuccessIcon}
                  alt="Success"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">Payment Released to Vendor</h2>
                <p className="text-sm text-gray-400 leading-relaxed pb-4">
                  Your payment of ₦180,000 has been successfully received by Ginaluxury after confirmed delivery of
                  Hermes birkin bag.
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="w-80">
          <div
            className="rounded-lg p-6 border"
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
        </div>
      </div>

    
      <div className="max-w-md mx-auto space-y-4">
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


export default EscrowPaymentReleasedDesktop;