"use client";
import React, { useState, useEffect } from "react";
import { getSlideClass } from "../lib/utils";
import Img1 from "@/features/assets/Onboarding-slide-1.png";
import Img2 from "@/features/assets/Onboarding-slide-2.png";
import Img3 from "@/features/assets/Onboarding-slide-3.png";
import Logo from "@/features/assets/bidnbuy-logo-2.png";
import ImageCarousel from "./ImageSlider";

interface AuthTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  slideFrom?: "left" | "right";
  cta?: string;
  loading?: boolean;
}

const images = [Img2, Img1, Img3];
const overlay = [
  {
    title: "Bid Smarter. Buy Better",
    description:
      "Join thousands of users who discover deals, win auctions, and shop premium products every day on Bid&Buy.",
  },
  {
    title: "Secure payments, trusted sellers",
    description:
      "Join thousands of users who discover deals, win auctions, and shop premium products every day on Bid&Buy.",
  },
  {
    title: "Your marketplace. Your advantage.",
    description:
      "Join thousands of users who discover deals, win auctions, and shop premium products every day on Bid&Buy.",
  },
];

export default function AuthTemplate({
  title,
  description,
  children,
  footer,
  slideFrom = "left",
}: AuthTemplateProps) {
  const [showFieldsShake, setShowFieldsShake] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Immediately set initial slide (offscreen)
    setSlideIn(false);
    // Then slide in after a tick
    const slideTimer = setTimeout(() => setSlideIn(true), 50); // 50ms is enough
    const shakeTimer = setTimeout(() => setShowFieldsShake(true), 500);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(shakeTimer);
    };
  }, []);

  const fieldsTranslateClass = getSlideClass(slideIn, slideFrom);

  const fieldsshakeclass = showFieldsShake ? "animate-shake" : "";

  return (
    <div className="min-h-screen flex bg-[#0a1b1d]">
      {/* Left Side - Form */}
      <div className="flex-1 bg-[#0a1b1d] flex flex-col px-12 py-8">
        <div className="max-w-lg mx-auto w-full">
          {/* Logo */}
          <div className="rounded-lg flex items-center -ml-5">
            <a href="" className="">
              <img src={Logo} alt="bidnbuy logo" className="" />
            </a>
          </div>

          <div className="mt-[5em] flex flex-col justify-center">
            {/* Header */}
            <div
              className={`mb-8 transform transition-transform duration-500 ease-out ${fieldsTranslateClass}`}
            >
              <div className={fieldsshakeclass}>
                <h1 className="text-white text-3xl font-semibold mb-3">
                  {title}
                </h1>
                <p className="text-[#FFFFFF80] text-base">{description}</p>
              </div>
            </div>

            {/* This is where the Form is rendered */}
            {children}

            {footer ? (
              <div
                className={`text-center text-gray-300 transform transition-transform duration-500 ease-out ${fieldsTranslateClass}`}
              >
                <div className={fieldsshakeclass}>{footer}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Right Side - Carousel */}
      <div className="flex-1 relative overflow-hidden">
        <div className="relative w-full h-full">
          <ImageCarousel
            images={images}
            showControls={false}
            overlayText={overlay}
            fit="cover"
          />
        </div>
      </div>
    </div>
  );
}
