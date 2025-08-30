import { useState } from "react"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

import HermesBagImage from "@/assets/products/hermes-bag.png"

export function ProductCarousel({ images = [] }: { images?: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = images.length > 0 ? images.length : 1

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl p-6 backdrop-blur-sm border border-slate-700/30">
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-slate-600/30 z-10">
        <Heart className="w-4 h-4 text-red-400 fill-red-400" />
        <span className="text-sm font-medium">200</span>
      </div>
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="w-full flex-shrink-0 flex justify-center py-4">
                <img
                  src={img}
                  alt={`Product image ${index + 1}`}
                  width={400}
                  height={400}
                  className="object-contain max-w-full h-[400px]"
                />
              </div>
            ))
          ) : (
            <div className="w-full flex-shrink-0 flex justify-center py-4">
              <img
                src={HermesBagImage}
                alt="Default product"
                width={400}
                height={400}
                className="object-contain max-w-full h-[400px]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSlide === index ? "bg-teal-400" : "bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
