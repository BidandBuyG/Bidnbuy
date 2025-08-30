type MobileCarouselSlideProps = {
  title: string
  subtitle?: string
  buttonText: string
  backgroundImage: string
  textOverlay?: {
    title: string
    subtitle?: string
  }
}

export function MobileCarouselSlide({
  title,
  subtitle,
  buttonText,
  backgroundImage,
  textOverlay,
}: MobileCarouselSlideProps) {
  return (
    <div className="flex-shrink-0 w-full snap-start">
      <div className="relative rounded-lg overflow-hidden h-40">
        <img src={backgroundImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-opacity-40">
          <div className="absolute inset-0 flex items-center">
            <div className="pl-6 z-10 flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{textOverlay?.title || title}</h2>
              <p className="text-sm text-gray-200 mb-4">{textOverlay?.subtitle || subtitle}</p>
              <button className="bg-yellow-500 text-black font-medium px-6 py-2 rounded-md text-sm flex items-center gap-2 shadow-lg hover:bg-yellow-400 transition-colors mt-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
