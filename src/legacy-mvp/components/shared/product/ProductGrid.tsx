import { ChevronRight } from "lucide-react"

import { Link } from "react-router-dom"
import { ProductCard } from "./ProductCard"

type ProductGridProps = {
  title: string
  products: Array<{
    image: string
    title: string
    rating: number
    reviews: number
    price: string
    originalPrice?: string
    actionType: "buy" | "bid" | "offer"
  }>
  columns?: 2 | 4 | 8
  showSeeAll?: boolean
}

const ProductGrid = ({
  title,
  products,
  columns = 2,
  showSeeAll = true,
}: ProductGridProps) => {
  const gridClass = columns === 4 ? "grid-cols-4" : "grid-cols-2"

  return (
    <div className="px-4 mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        {showSeeAll && (
          <Link to="#" className="text-xs text-gray-300 flex items-center">
            See all <ChevronRight size={14} />
          </Link>
        )}
      </div>
      <div className={`grid ${gridClass} gap-3`}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
