import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"

import type { ReviewCardProps } from "../types/reviews-and-ratings"

import StarRating from "./StarRating"


/**
 * ReviewCard component displays an individual review with user info and voting.
 * @param {ReviewCardProps} props - The component props.
 * @returns {JSX.Element} The rendered review card.
 */

const ReviewCard = ({ review, onVote }: ReviewCardProps) => {
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)

  const handleVote = (type: "like" | "dislike") => {
    const newVote = userVote === type ? null : type
    setUserVote(newVote)
    onVote?.(review.id, type)
  }

  return (
    <div className="mb-8">

      <div className="flex items-center gap-3 mb-4">
        <img
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
