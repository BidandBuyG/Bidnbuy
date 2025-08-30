/**
 * Types for review data.
 * @typedef {Object} Review
 * @property {string} id - Unique review identifier.
 * @property {string} userName - Name of the reviewer.
 * @property {string} userAvatar - URL to user's avatar image.
 * @property {string} timeAgo - Time since review was posted (e.g., "2 months ago").
 * @property {number} rating - Star rating (1-5).
 * @property {string} comment - Review text content.
 * @property {number} likes - Number of likes.
 * @property {number} dislikes - Number of dislikes.
 */

export interface Review {
  id: string
  userName: string
  userAvatar: string
  timeAgo: string
  rating: number
  comment: string
  likes: number
  dislikes: number
}


/**
 * Props for the ReviewCard component.
 * @typedef {Object} ReviewCardProps
 * @property {Review} review - The review data to display.
 * @property {(reviewId: string, type: 'like' | 'dislike') => void} [onVote] - Callback for like/dislike actions.
 */

export type ReviewCardProps = {
  review: Review
  onVote?: (reviewId: string, type: "like" | "dislike") => void
}





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

export type RatingsAndReviewFeatureProps = {
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