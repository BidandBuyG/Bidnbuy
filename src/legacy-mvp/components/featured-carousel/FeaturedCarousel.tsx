import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MobileCarouselSlide } from "../carousel/MobileCarouselSlide"

import DashboardHeroImg from "@/assets/products/dashboard-hero.jpg"
import SmartTvImg from "@/assets/products/smart-tv.jpg"

export function FeaturedCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      title: "Nike Air 2025",
      subtitle: "Premium Collection",
      buttonText: "Bid now",
      backgroundImage: DashboardHeroImg,
      textOverlay: {
        title: "Nike Air 2025",
        subtitle: "Premium Collection",
      },
    },
    {
      title: "Tech Gadgets Sale",
      subtitle: "Up to 50% Off",
      buttonText: "Shop now",
      backgroundImage: DashboardHeroImg,
      textOverlay: {
        title: "Tech Gadgets Sale",
        subtitle: "Up to 50% Off",
      },
    },
    {
      title: "New Arrivals",
      subtitle: "Latest Collection",
      buttonText: "Explore",
      backgroundImage: SmartTvImg,
      textOverlay: {
        title: "Smart TV Collection",
        subtitle: "Latest 2023 Models",
      },
    },
  ]

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: currentSlide * slideWidth,
        behavior: "smooth",
      })
    }
  }, [currentSlide])

  return (
    <div className="px-4 mt-4">
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden no-scrollbar snap-x snap-mandatory"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ scrollBehavior: "smooth" }}
        >
          {slides.map((slide, index) => (
            <MobileCarouselSlide key={index} {...slide} />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex justify-center mt-3 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-yellow-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
