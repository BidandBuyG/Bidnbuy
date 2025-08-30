import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { DesktopCategoryCard } from "../category-cards/DesktopCategoryCard"

import AntiquePerfumeImg from "@/assets/products/antique-perfume-img.png"
import SmartTvImg from "@/assets/products/smart-tv.jpg"
import FashionImg from "@/assets/products/fashion-img.jpg"
import WashingMachineImg from "@/assets/products/washing-machine-img.jpg"
import BedroomImg from "@/assets/products/bedroom-set.jpg"
import MercedesImg from "@/assets/products/mercedes-benz.jpg"
import FootwearsImg from "@/assets/products/footwears-img.jpg"

export function DesktopDiscoverSection() {
  const categories = [
    { image: AntiquePerfumeImg, title: "Beauty" },
    { image: SmartTvImg, title: "Gadgets" },
    { image: WashingMachineImg, title: "Appliances" },
    { image: FashionImg, title: "Fashion" },
    { image: BedroomImg, title: "Home Interior" },
    { image: FootwearsImg, title: "Footwears" },
    { image: MercedesImg, title: "Automobiles" },
    { image: BedroomImg, title: "Furnitures" },
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Discover More on BidnBuy</h2>
        <Link to="#" className="text-sm text-gray-300 flex items-center hover:text-white">
          See all <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <DesktopCategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  )
}
