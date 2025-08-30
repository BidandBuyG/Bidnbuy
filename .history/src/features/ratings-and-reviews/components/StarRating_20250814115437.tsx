import { useState } from "react"
import { Star } from "lucide-react"

/**
 * Props for the StarRating component.
 * @typedef {Object} StarRatingProps
 * @property {number} [initialRating] - Initial rating value (0-5).
 * @property {(rating: number) => void} [onRatingChange] - Callback when rating changes.
 * @property {boolean} [readonly] - Whether the rating is read-only.
 * @property {string} [size] - Size variant ('sm' | 'md' | 'lg').
 */

interface StarRatingProps {
  initialRating?: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * StarRating component for interactive star rating selection.
 * @param {StarRatingProps} props - The component props.
 * @returns {JSX.Element} The rendered star rating component.
 */
export function StarRating({ initialRating = 0, onRatingChange, readonly = false, size = "md" }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const handleStarClick = (starRating: number) => {
    if (readonly) return
    setRating(starRating)
    onRatingChange?.(starRating)
  }

  const handleStarHover = (starRating: number) => {
    if (readonly) return
    setHoverRating(starRating)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
  }

  return (
    <div className="flex gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating)
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            disabled={readonly}
            className={`transition-colors ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors ${
                isFilled ? "fill-[#00707B] text-[#00707B]" : "text-gray-500"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
