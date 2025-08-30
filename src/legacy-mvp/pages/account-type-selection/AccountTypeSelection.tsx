import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMediaQuery } from "@/hooks/useMediaQuery"

import ShoppingBagImage from "@/assets/shopping-bag.jpg"
import BidnBuyLogo from "@/assets/bidnbuy-logo.png"
import { Link } from "react-router-dom"

export default function AccountTypeSelection() {
  const [selectedType, setSelectedType] = useState<"customer" | "vendor">("customer")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const navigate = useNavigate()

  const handleProceed = () => {
    navigate(`/signup/${selectedType}`)
  }

  return (
    <div className="min-h-screen w-full relative bg-slate-800 flex items-center justify-center p-8">
  
      <div className="absolute inset-0 z-0">
        <img src={ShoppingBagImage} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-800/75 md:bg-slate-800/40" />
      </div>

  
      <div className={`relative z-10 w-full ${isDesktop ? "max-w-lg" : ""}`}>
      
        <div
          className={`${
            isDesktop ? "rounded-3xl overflow-hidden shadow-2xl mx-auto my-8" : "min-h-screen"
          }`}
          style={isDesktop ? { backgroundColor: "#01151C" } : {}}
        >
          
          <div className="relative z-10 flex flex-col px-8 py-8 md:px-10 md:py-12">
     
            <div
              className={`flex ${isDesktop ? "justify-start" : "justify-center"} pb-8 md:pb-6`}
            >
              <img
                src={BidnBuyLogo}
                alt="Bid and Buy Logo"
                width={isDesktop ? 140 : 120}
                height={isDesktop ? 140 : 120}
                className="object-contain"
              />
            </div>

            <div className={`${isDesktop ? "text-left" : "text-center"} mb-8 md:mb-8`}>
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Welcome To Bid and Buy
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                New Here? We've Been Waiting for You
                <br />
                Start <span className="font-semibold">bidding</span>, Start{" "}
                <span className="font-semibold">winning</span>, Start now.
              </p>
            </div>

           
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8 md:mb-8">
                <p className="text-white text-lg md:text-xl mb-6 font-medium">Sign up as:</p>

              
                <div className="space-y-4 md:space-y-4 mb-8 md:mb-8">
                  <button
                    onClick={() => setSelectedType("customer")}
                    className={`w-full py-5 md:py-4 px-6 border-2 text-left text-lg md:text-lg font-medium transition-all cursor-pointer ${
                      selectedType === "customer"
                        ? "border-teal-400 bg-teal-400/20 text-teal-300"
                        : isDesktop
                        ? "border-teal-600/70 bg-transparent text-gray-300 hover:border-teal-500"
                        : "border-teal-600/40 bg-slate-700/40 text-gray-300"
                    }`}
                  >
                    Customer
                  </button>

                  <button
                    onClick={() => setSelectedType("vendor")}
                    className={`w-full py-5 md:py-4 px-6 border-2 text-left text-lg md:text-lg font-medium transition-all cursor-pointer ${
                      selectedType === "vendor"
                        ? "border-teal-400 bg-teal-400/20 text-teal-300"
                        : isDesktop
                        ? "border-teal-600/70 bg-transparent text-gray-300 hover:border-teal-500"
                        : "border-teal-600/40 bg-slate-700/40 text-gray-300"
                    }`}
                  >
                    Vendor
                  </button>
                </div>

              
                <button
                  onClick={handleProceed}
                  className={`w-full bg-teal-500 hover:bg-teal-600 text-white py-5 md:py-4 font-semibold text-lg md:text-lg cursor-pointer`}
                
                >
                  Proceed
                  {/* {!isDesktop && <ArrowRight className="ml-2 h-5 w-5" />} */}
                </button>
              </div>
            </div>

        
        
            <div className={`${isDesktop ? "text-left" : "text-center"} pb-4`}>
              <p className="text-gray-400 text-base md:text-lg">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
