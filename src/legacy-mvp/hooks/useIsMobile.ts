import { useEffect, useState } from "react"

export function useIsMobile(breakpoint: number = 1024) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < breakpoint : true)

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [breakpoint])

  return isMobile
  
}