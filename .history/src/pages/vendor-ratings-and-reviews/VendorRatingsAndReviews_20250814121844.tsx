"use client"

/**
 * @file app/vendor-ratings/page.tsx
 * @description Vendor ratings page using the reusable RatingsPage component.
 */

// import { RatingsPage } from "@/components/ratings/ratings-page"
// import type { Review } from "@/components/ratings/review-card"
import RatingsAndReviews from "@/features/ratings-and-reviews/RatingsAndReviews"

/**
 * VendorRatingsPage component displays vendor ratings and reviews.
 * @returns {JSX.Element} The rendered vendor ratings page.
 */
const VendorRatingsAndReviews = () => {
  const config = {
    type: "vendor" as const,
    title: "Vendor Ratings and Reviews",
    rateText: "Rate this vendor",
    backUrl: "/", // Adjust based on your routing
    vendor: {
      name: "Alex Johnson",
      email: "Alex.johnsonbusiness@gmail.com",
      avatar: "/images/amelia-profile.jpg", // Reusing existing avatar
    },
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
      userAvatar: "/images/amelia-profile.jpg",
      timeAgo: "2 weeks ago",
      rating: 5,
      comment:
        "Alex Johnson exceeded our expectations with his innovative software solutions and exceptional customer service.",
      likes: 15,
      dislikes: 2,
    },
    {
      id: "2",
      userName: "Ethan Benedict",
      userAvatar: "/images/amelia-profile.jpg",
      timeAgo: "4 months ago",
      rating: 4,
      comment:
        "His team delivered a solid product, but there were some minor issues that needs addressing. Overall, a positive experience.",
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

export default VendorRatingsAndReviews;
