import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
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

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const allowedLimits = [10, 25, 50];

export function getValidPage(raw: string | null) {
  const num = Number(raw);
  return isNaN(num) || num < 1 ? 1 : num;
}

export function getValidLimit(raw: string | null) {
  const num = Number(raw);
  return allowedLimits.includes(num) ? num : 10;
}
