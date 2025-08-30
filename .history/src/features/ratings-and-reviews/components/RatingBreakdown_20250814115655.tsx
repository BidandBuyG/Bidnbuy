import { Star } from "lucide-react"

/**
 * Types for rating distribution data.
 * @typedef {Object} RatingDistribution
 * @property {number} stars - Number of stars (1-5).
 * @property {number} percentage - Percentage of reviews with this rating.
 * @property {number} count - Number of reviews with this rating.
 */

type RatingDistribution = {
  stars: number
  percentage: number
  count: number
}

/**
 * Props for the RatingBreakdown component.
 * @typedef {Object} RatingBreakdownProps
 * @property {number} averageRating - Average rating (e.g., 4.5).
 * @property {number} totalReviews - Total number of reviews.
 * @property {RatingDistribution[]} distribution - Rating distribution data.
 */

interface RatingBreakdownProps {
  averageRating: number
  totalReviews: number
  distribution: RatingDistribution[]
}

/**
 * RatingBreakdown component displays overall rating and distribution.
 * @param {RatingBreakdownProps} props - The component props.
 * @returns {JSX.Element} The rendered rating breakdown.
 */

export function RatingBreakdown({ averageRating, totalReviews, distribution }: RatingBreakdownProps) {
  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 !== 0

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
      {/* Overall Rating */}
      <div className="flex flex-col items-start">
        <div className="text-6xl font-bold text-white mb-2">{averageRating}</div>
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${
                star <= fullStars
                  ? "fill-[#00707B] text-[#00707B]"
                  : star === fullStars + 1 && hasHalfStar
                    ? "fill-[#00707B]/50 text-[#00707B]"
                    : "text-gray-500"
              }`}
            />
          ))}
        </div>
        <div className="text-gray-300 text-base">{totalReviews}</div>
      </div>

      {/* Rating Distribution */}
      <div className="flex-1 space-y-2">
        {distribution
          .sort((a, b) => b.stars - a.stars)
          .map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-white text-base w-2">{item.stars}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-[#00707B] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-gray-300 text-base w-12 text-right">{item.percentage}%</span>
            </div>
          ))}
      </div>
    </div>
  )
}
