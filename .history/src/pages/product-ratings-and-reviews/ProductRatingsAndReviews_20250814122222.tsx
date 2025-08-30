"use client"

/**
 * @file app/product-ratings/page.tsx
 * @description Product ratings page using the reusable RatingsPage component.
 */

import { RatingsPage } from "@/components/ratings/ratings-page"
import type { Review } from "@/components/ratings/review-card"

/**
 * ProductRatingsPage component displays product ratings and reviews.
 * @returns {JSX.Element} The rendered product ratings page.
 */
export default function ProductRatingsPage() {
  // Mock data - in a real app, this would come from an API
  const config = {
    type: "product" as const,
    title: "Product Ratings and Reviews",
    rateText: "Rate this product",
    backUrl: "/", // Adjust based on your routing
  }

  const averageRating = 4.5
  const totalReviews = 120

  const distribution = [
    { stars: 5, percentage: 40, count: 48 },
    { stars: 4, percentage: 30, count: 36 },
    { stars: 3, percentage: 15, count: 18 },
    { stars: 2, percentage: 10, count: 12 },
    { stars: 1, percentage: 5, count: 6 },
  ]

  const reviews: Review[] = [
    {
      id: "1",
      userName: "Sophia Clark",
      userAvatar: "/images/amelia-profile.jpg", // Reusing existing avatar
      timeAgo: "2 months ago",
      rating: 5,
      comment:
        "The product exceeded my expectations. The quality is top notch and it arrived earlier than expected. Highly recommend!",
      likes: 15,
      dislikes: 2,
    },
    {
      id: "2",
      userName: "Ethan Benedict",
      userAvatar: "/images/amelia-profile.jpg", // Reusing existing avatar
      timeAgo: "4 months ago",
      rating: 4,
      comment:
        "Great product for the price. It has a few minor issues but overall, it's a solid purchase. Would definitely buy again.",
      likes: 8,
      dislikes: 1,
    },
  ]

  return (
    <RatingsAndReviews
      config={config}
      averageRating={averageRating}
      totalReviews={totalReviews}
      distribution={distribution}
      reviews={reviews}
    />
  )
}
