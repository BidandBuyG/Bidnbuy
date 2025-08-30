

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