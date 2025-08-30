import AddToCartIcon from "@/components/svg-icons/AddToCartIcon"
import BidIcon from "@/components/svg-icons/BidIcon"
import HeartIcon from "@/components/svg-icons/HeartIcon"
import StarRatingIcon from "@/components/svg-icons/StarRatingIcon"

type ProductCardProps = {
  image: string
  title: string
  rating: number
  reviews: number
  price: string
  originalPrice?: string
  actionType: "buy" | "bid" | "offer"
}



export function ProductCard({
  image,
  title,
  rating,
  reviews,
  price,
  originalPrice,
  actionType,
}: ProductCardProps) {
  return (
    <div className="bg-[#00222E] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={image || "/placeholder.svg?height=200&width=200"}
          alt={title}
          width={200}
          height={200}
          className="w-full h-32 md:h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
          <HeartIcon />
        </div>
      </div>

      <div className="p-3 md:p-4">
        <h3 className="text-sm font-medium text-white mb-1 md:mb-2 truncate md:line-clamp-2">{title}</h3>

        <div className="flex items-center gap-1 mb-1 md:mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarRatingIcon keyNum={i} rating={rating} />
              
            ))}
          </div>
          <span className="text-xs text-gray-300">({reviews.toLocaleString()})</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-2 md:mb-3 justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base md:text-lg">{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
          <ActionButton type={actionType} />
        </div>
      </div>
    </div>
  )
}

function ActionButton({ type }: { type: "buy" | "bid" | "offer" }) {
  const styles = {
    buy: "bg-orange-500 hover:bg-orange-600 text-white",
    bid: "bg-red-500 hover:bg-red-600 text-white",
    offer: "bg-yellow-500 hover:bg-yellow-600 text-black",
  }

  const labels = {
    buy: "Buy",
    bid: "Bid",
    offer: "Add to Cart",
  }

  const icons = {
    buy: (
      <AddToCartIcon />
    ),
    bid: (
      <BidIcon />
    ),
    offer: (
      <AddToCartIcon />
    ),
  }

  return (
    <button
      className={`${styles[type]} text-xs md:text-sm px-2 py-1 md:px-3 md:py-2.5 rounded-md font-medium flex items-center gap-1 md:gap-2 mt-2 md:mt-0`}
    >
      {icons[type]}
      {labels[type]}
    </button>
  )
}
