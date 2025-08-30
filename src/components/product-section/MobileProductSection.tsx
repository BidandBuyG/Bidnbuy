import { Link } from "react-router-dom"

import { ChevronRight } from "lucide-react"

import { ProductCard } from "../shared/product/ProductCard"

type MobileProductSectionProps = {
  title: string
  products: Array<{
    image: string
    title: string
    rating: number
    reviews: number
    price: string
    actionType: "buy" | "bid" | "offer"
  }>
}

export function MobileProductSection({ title, products }: MobileProductSectionProps) {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">{title}</h2>
        <Link to="#" className="text-xs text-gray-300 flex items-center">
          See all <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}
