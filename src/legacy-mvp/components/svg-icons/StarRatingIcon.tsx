type StarRatingProps = {
  keyNum: number
  rating: number
}

const StarRatingIcon = ({ keyNum, rating }: StarRatingProps) => {
  return (
    <svg
      key={keyNum}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill={keyNum < rating ? "gold" : "none"}
      stroke={keyNum < rating ? "none" : "gray"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5.11L14.5 10.19L20 11.15L16 15.05L17.18 20.6L12 17.95L6.82 20.6L8 15.05L4 11.15L9.5 10.19L12 5.11Z" />
    </svg>
  )
}

export default StarRatingIcon