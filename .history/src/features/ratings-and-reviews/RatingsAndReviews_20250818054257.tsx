import { useState } from "react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import StarRating from "./components/StarRating"
import RatingBreakdown from "./components/RatingBreakdown"
import type { RatingsAndReviewFeatureProps } from "./types/reviews-and-ratings"

import { ReviewCard } from "./components/ReviewCard"
import VendorProfile from "./components/VendorProfile"
import PageHeader from "@/components/page-header/PageHeader"


/**
 * RatingsPage component - reusable for both product and vendor ratings.
 * @param {RatingsAndReviewFeatureProps} props - The component props.
 * @returns {JSX.Element} The rendered ratings page.
 */

const RatingsAndReviews = ({ config, averageRating, totalReviews, distribution, reviews }: RatingsAndReviewFeatureProps) => {
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
    <div className="min-h-screen bg-[#01151C]">

      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-4xl">

          <PageHeader title={config.title} backUrl={config.backUrl} />

          
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

        
          <RatingBreakdown averageRating={averageRating} totalReviews={totalReviews} distribution={distribution} />

       
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

export default RatingsAndReviews;
