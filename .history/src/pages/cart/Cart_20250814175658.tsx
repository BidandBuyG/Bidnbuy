import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

// import { CartItemComponent } from "@/components/cart/cart-item"
import { OrderSummary } from "@/components/cart/order-summary"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

/**
 * @file app/cart/page.tsx
 * @description Main shopping cart page displaying cart items and order summary.
 */

/**
 * CartPage component displays the shopping cart with items and checkout functionality.
 * @returns {JSX.Element} The rendered cart page.
 */
export default function CartPage() {
  const { toast } = useToast()
  const router = useRouter()
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
        <Header />
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

  /**
   * Handles the checkout process.
   */
  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to payment page...",
    })

    // In a real app, this would navigate to checkout/payment page
    // router.push('/checkout')
  }

  // Prepare order summary data
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
      <Header />

      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-4xl">
          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <Link href="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Your Cart</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">Your Cart</h1>

          {/* Cart Items */}
          <div className="mb-8">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg mb-4">Your cart is empty</p>
                <Button
                  onClick={() => router.push("/")}
                  className="text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity px-6 py-3"
                  style={{ backgroundColor: "#00707B" }}
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
                    className="w-full max-w-md text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6"
                    style={{ backgroundColor: "#00707B" }}
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
