import { useState } from "react"

import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

import { StarRating } from "./star-rating"
import { RatingBreakdown } from "./rating-breakdown"
import { ReviewCard, type Review } from "./review-card"
import { VendorProfile } from "./vendor-profile"


/**
 * Types for ratings and review feature configuration.
 * @typedef {Object} RatingsPageConfig
 * @property {'product' | 'vendor'} type - Type of rating page.
 * @property {string} title - Page title.
 * @property {string} rateText - Text for rating section (e.g., "Rate this product").
 * @property {string} backUrl - URL for back navigation.
 * @property {Object} [vendor] - Vendor profile data (only for vendor ratings).
 */

type RatingsAndReviewsFeatureConfig = {
  type: "product" | "vendor"
  title: string
  rateText: string
  backUrl: string
  vendor?: {
    name: string
    email: string
    avatar: string
  }
}

/**
 * Props for the RatingsPage component.
 * @typedef {Object} RatingsPageProps
 * @property {RatingsAndReviewsFeatureConfig} config - Page configuration.
 * @property {number} averageRating - Average rating.
 * @property {number} totalReviews - Total number of reviews.
 * @property {Array} distribution - Rating distribution data.
 * @property {Review[]} reviews - Array of reviews to display.
 */

type RatingsAndReviewFeatureProps = {
  config: RatingsAndReviewsFeatureConfig
  averageRating: number
  totalReviews: number
  distribution: Array<{
    stars: number
    percentage: number
    count: number
  }>
  reviews: Review[]
}

/**
 * RatingsPage component - reusable for both product and vendor ratings.
 * @param {RatingsAndReviewFeatureProps} props - The component props.
 * @returns {JSX.Element} The rendered ratings page.
 */
export function RatingsPage({ config, averageRating, totalReviews, distribution, reviews }: RatingsAndReviewFeatureProps) {
  const [userRating, setUserRating] = useState(0)

  const handleRatingChange = (rating: number) => {
    setUserRating(rating)
  }

  const handleWriteReview = () => {
    toast.info(`Write review functionality for ${config.type} would be implemented here.`)
  }

  const handleVote = (reviewId: string, type: "like" | "dislike") => {
    toast.info(`Your ${type} has been recorded for review ${reviewId}.`)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>

      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-4xl">
            
          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <Link href={config.backUrl} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Ratings & Review</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">{config.title}</h1>

          {/* Vendor Profile (Mobile Only) */}
          {config.type === "vendor" && config.vendor && <VendorProfile vendor={config.vendor} />}

          {/* Rate Section */}
          <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-6">{config.rateText}</h2>
            <div className="flex items-center justify-center md:justify-start mb-6">
              <StarRating initialRating={userRating} onRatingChange={handleRatingChange} size="lg" />
            </div>
            <div className="flex justify-center md:justify-start">
              <Button
                onClick={handleWriteReview}
                className="text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity px-8 py-3"
                style={{ backgroundColor: "#00707B" }}
              >
                Write a review
              </Button>
            </div>
          </div>

          {/* Rating Breakdown */}
          <RatingBreakdown averageRating={averageRating} totalReviews={totalReviews} distribution={distribution} />

          {/* All Reviews */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-6">All Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} onVote={handleVote} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
