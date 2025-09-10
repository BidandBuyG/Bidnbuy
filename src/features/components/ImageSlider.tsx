import React, { useState, useRef, useEffect, useCallback } from "react";

type OverlayItem = string | { title: string; description?: string };

interface CarouselProps {
  images: (string | { src: string; alt?: string })[];
  showControls?: boolean;
  overlayText?: OverlayItem[];
  autoSlideInterval?: number;
  children?: React.ReactNode;
  fit?: "cover" | "contain";
}

const ImageCarousel: React.FC<CarouselProps> = ({
  images,
  showControls = true,
  overlayText = [],
  autoSlideInterval = 5000,
  fit = "contain",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  }, [images.length]);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => {
      clearInterval(slideTimer);
    };
  }, [activeIndex, autoSlideInterval, nextSlide]);

  const currentOverlay = overlayText[activeIndex];

  return (
    <div
      ref={sliderRef}
      // className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#00191F]"
      className="absolute inset-0 overflow-hidden bg-[#00191F]"
    >
      <img
        src={
          typeof images[activeIndex] === "string"
            ? (images[activeIndex] as string)
            : (images[activeIndex] as { src: string }).src
        }
        width={1001}
        height={100}
        alt={`Slide ${activeIndex}`}
        className={`w-full h-full object-${fit} select-none`}
      />
      {/* Overlay */}
      <div className="absolute bottom-0 w-full flex justify-center items-center bg-gradient-to-b from-transparent via-black/60 to-black/90 pb-6">
        <div className="text-center grid gap-6 pb-8 md:pb-10 pt-8 px-6 sm:px-10 md:px-16">
          {typeof currentOverlay === "string" ? (
            <p className="text-white/80 text-lg md:text-xl leading-snug">
              {currentOverlay}
            </p>
          ) : (
            <div className="space-y-2">
              <h3 className="text-white text-2xl md:text-3xl font-semibold leading-tight">
                {currentOverlay?.title}
              </h3>
              {currentOverlay?.description ? (
                <p className="text-white/70 text-sm md:text-base max-w-3xl mx-auto">
                  {currentOverlay.description}
                </p>
              ) : null}
            </div>
          )}
          <div className="flex justify-center space-x-2 mt-5">
            {images.map((_, index) => (
              <div
                key={index}
                className={`${
                  activeIndex === index
                    ? "bg-[#007F93] border-primary w-12"
                    : "bg-transparent border-white w-4"
                } border h-4 rounded-full`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-white"
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-white"
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
