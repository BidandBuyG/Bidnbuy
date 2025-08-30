import { useState } from "react"
import { ShoppingCart, Bell } from "lucide-react"
import { MobileNavigation } from "../mobile-navigation/MobileNavigation"

import BidnBuyLogo from "@/assets/bidnbuy-logo.png"



const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // This would typically come from your auth context/state management
  // For demo purposes, you can toggle this to test both states
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Change to true to test logged-in state

  return (
    <>
      <header className="md:hidden block relative sticky top-0 z-10 bg-[#00545F] p-4 flex items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button className="p-1" onClick={() => setIsMenuOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="2" rx="1" fill="white" />
              <rect x="3" y="11" width="18" height="2" rx="1" fill="white" />
              <rect x="3" y="17" width="18" height="2" rx="1" fill="white" />
            </svg>
          </button>
          <img src={BidnBuyLogo} alt="BidnBuy Logo" width={40} height={40} className="object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <button>
            <ShoppingCart size={20} />
          </button>
          <button>
            <Bell size={20} />
          </button>
          <button>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Demo toggle button - remove in production */}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="absolute top-16 right-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs"
        >
          Toggle: {isLoggedIn ? "Logged In" : "Logged Out"}
        </button>
      </header>

      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isLoggedIn={isLoggedIn} />
    </>
  )
}

export default MobileHeader;
