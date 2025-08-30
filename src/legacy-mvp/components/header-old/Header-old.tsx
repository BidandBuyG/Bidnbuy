import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

import BidnBuyDarkLogo from "@/assets/bidnbuy-dark-logo.png"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
               
                <img src={BidnBuyDarkLogo} alt="Background" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-gray-900">BidnBuy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/account-type" className="text-gray-700 hover:text-teal-600 transition-colors">
              Account Type Selection
            </Link>
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link to="/customer-account-verify" className="text-gray-700 hover:text-teal-600 transition-colors">
              Account Verify
            </Link>
            <Link to="/product-home" className="text-gray-700 hover:text-teal-600 transition-colors">
              Product
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-teal-600 transition-colors">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#00707B] hover:bg-[#00636D] text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/account-type"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account Type
              </Link>
              <Link
                to="/home"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/customer-account-verify"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account verify
              </Link>
              <Link
                to="/product-home"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
