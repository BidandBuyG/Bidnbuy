/**
 * Category tabs component for auction filtering
 * Only visible on desktop as per requirements
 */

export type AuctionCategoryTabsProps = {
  categories: CategoryTab[]
  onCategoryChange?: (categoryId: string) => void
  className?: string
}

/**
 * Type definitions for auction components
 * Centralizes all auction-related type definitions for better maintainability
 */


export type AuctionItem = {
  image: string
  title: string
  currentBid: string
  timeRemaining: string
  bidCount: number
  actionType: "bid" | "buy_now" | "watch"
  isHot?: boolean
  isClosingSoon?: boolean
}

export type AuctionSectionConfig = {
  title: string
  items: AuctionItem[]
  showSeeAll?: boolean
  columns?: 2 | 4
}


export type AuctionBannerProps = {
  title: string
  subtitle?: string
  buttonText?: string
  backgroundImage?: string
  className?: string
}


export type CategoryTab = {
  id: string
  label: string
  active?: boolean
}


export type AuctionNavigationState = {
  isMenuOpen: boolean
  isLoggedIn: boolean
  activeCategory: string
}
