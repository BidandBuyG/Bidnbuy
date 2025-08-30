import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"

import OrderSummary from "./components/OrderSummary"
import CartItemComponent from "./components/CartItemComponent"


const Cart = () => {
  const navigate = useNavigate()
  const [isClient, setIsClient] = useState(false)

  // Access cart store
  const { items, fees, setInsurance, getSubtotal, getTotal, _hasHydrated } = useCartStore()

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render until hydrated to prevent hydration mismatch
  if (!isClient || !_hasHydrated) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>

        <main className="px-4 py-6 md:px-8 md:py-12">
          <div className="max-w-md mx-auto md:max-w-4xl">
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">Loading cart...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }


  const handleRedirect = () => navigate("/");

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.warning("Please add items to your cart before proceeding to checkout.")
      return
    }

    toast.success("Proceeding to Checkout. Redirecting to payment page...")
  }

  const orderSummaryData = {
    subtotal: getSubtotal(),
    shipping: fees.shipping,
    vat: fees.vat,
    buyerFee: fees.buyerFee,
    escrowFee: fees.escrowFee,
    insuranceSelected: fees.insuranceSelected,
    insuranceFee: fees.insuranceFee,
    total: getTotal(),
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>


      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-4xl">

          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Your Cart</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">Your Cart</h1>

          <div className="mb-8">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg mb-4">Your cart is empty</p>
                <Button
                  onClick={handleRedirect}
                  className="bg-[#00707B] text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity px-6 py-3"
                 
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}

               
                <OrderSummary data={orderSummaryData} onInsuranceChange={setInsurance} />

             
                <div className="flex justify-center md:justify-start">
                  <Button
                    onClick={handleCheckout}
                    style={{ backgroundColor: "" }}
                    className="w-full max-w-md text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 bg-[]"
                  >
                    {/* Different button text for mobile vs desktop as shown in screenshots */}
                    <span className="md:hidden">Proceed to Checkout</span>
                    <span className="hidden md:inline">Confirm and Pay</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Cart;
