import type { PromotionalBannerProps } from "@/pages/marketplace/types/marketplace";

const PromotionalBanner = ({
  title,
  subtitle,
  buttonText = "Shop Now",
  backgroundImage,
  className = "",
}: PromotionalBannerProps) => {
  return (
    <div className={`relative rounded-lg overflow-hidden h-48 mb-8 mx-4 ${className}`}>
      <img src={backgroundImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-opacity-50">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-lg text-gray-200 mb-4">{subtitle}</p>}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromotionalBanner;
