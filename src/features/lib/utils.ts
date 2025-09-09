import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSlideClass(slideIn: boolean, slideFrom?: "left" | "right") {
  if (!slideIn) {
    // Initial state before animation
    return slideFrom === "left" ? "-translate-x-full" : "translate-x-full";
  }
  // After slideIn is true → slide into place
  return "translate-x-0";
}
