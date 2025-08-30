import { Link } from "react-router-dom"

import { ChevronRight } from "lucide-react"

import { ProductCard } from "../shared/product/ProductCard"

type DesktopProductSectionProps = {
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
  columns?: number
}

export function DesktopProductSection({ title, products, columns = 4 }: DesktopProductSectionProps) {
  const gridCols = {
    4: "grid-cols-4",
    8: "grid-cols-4",
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <Link to="#" className="text-sm text-gray-300 flex items-center hover:text-white">
          See all <ChevronRight size={16} />
        </Link>
      </div>
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4`}>
        {products.slice(0, columns === 8 ? 8 : 4).map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}
