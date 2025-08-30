import { User, Bell } from "lucide-react"
import { useState } from "react"

import { Link } from "react-router-dom"
import { AuthButtons } from "../auth-buttons/AuthButtons"
import { CategoryTabs } from "../category-tabs/CategoryTabs"
import { SearchInput } from "../search-input/SearchInput"

import BidnBuyLogo from "@/assets/bidnbuy-logo.png"

const MainNav = () => {
  const categories = [
    "All",
    "Accessories",
    "Gadgets",
    "Fashion",
    "Electronics",
    "Health&Beauty",
    "Home&Office",
    "Appliances",
  ]
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="bg-[#01151C] px-6 py-4">
      <div className="flex items-start justify-between">
  
        <div className="flex items-center">
          <img src={BidnBuyLogo} alt="BidnBuy" width={80} height={80} className="object-contain" />
        </div>

    
        <div className="flex-1 max-w-2xl mx-8">
          <SearchInput placeholder="Find everything you have been looking for" className="mb-4" />
        
          <CategoryTabs 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="flex flex-col items-end gap-3">
        
          <div className="flex items-center gap-4">
            <Link to="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300">
              <User size={16} />
              Account
            </Link>
            <Link to="#" className="flex items-center gap-1.5 text-sm hover:text-gray-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12h18l-2 7H5l-2-7z" />
                <path d="M5 12V7a7 7 0 0114 0v5" stroke="white" strokeWidth="1" fill="none" />
              </svg>
              Ship to
            </Link>
            <Bell size={16} className="text-gray-300" />
          </div>

          <AuthButtons />
        </div>
      </div>
    </div>
  )
}


export default MainNav;
