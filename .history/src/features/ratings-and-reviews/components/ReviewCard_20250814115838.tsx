"use client"

/**
 * @file components/ratings/review-card.tsx
 * @description Reusable component for displaying individual reviews.
 */

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { StarRating } from "./star-rating"
import Image from "next/image"

/**
 * Interface for review data.
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
interface ReviewCardProps {
  review: Review
  onVote?: (reviewId: string, type: "like" | "dislike") => void
}

/**
 * ReviewCard component displays an individual review with user info and voting.
 * @param {ReviewCardProps} props - The component props.
 * @returns {JSX.Element} The rendered review card.
 */
export function ReviewCard({ review, onVote }: ReviewCardProps) {
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)

  const handleVote = (type: "like" | "dislike") => {
    const newVote = userVote === type ? null : type
    setUserVote(newVote)
    onVote?.(review.id, type)
  }

  return (
    <div className="mb-8">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={review.userAvatar || "/placeholder.svg"}
          alt={`${review.userName}'s avatar`}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-white text-base font-semibold">{review.userName}</p>
          <p className="text-gray-400 text-sm">{review.timeAgo}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating initialRating={review.rating} readonly size="sm" />
      </div>

      {/* Review Text */}
      <p className="text-gray-300 text-base leading-relaxed mb-4">{review.comment}</p>

      {/* Vote Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleVote("like")}
          className={`flex items-center gap-2 transition-colors ${
            userVote === "like" ? "text-[#00707B]" : "text-gray-400 hover:text-white"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm">{review.likes}</span>
        </button>
        <button
          onClick={() => handleVote("dislike")}
          className={`flex items-center gap-2 transition-colors ${
            userVote === "dislike" ? "text-red-400" : "text-gray-400 hover:text-white"
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm">{review.dislikes}</span>
        </button>
      </div>
    </div>
  )
}
