export type UIProduct = {
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice?: string;
  actionType: "buy" | "bid" | "offer";
};

export type MarketPlaceProps = {
  isLoading: boolean;
  recentlyAddedProducts: UIProduct[];
  trendingProducts: UIProduct[];
  gadgetsProducts: UIProduct[];
  recommendedItems: UIProduct[];
  topPicksProducts: UIProduct[];
}

export type MarketplaceHeroBannerProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  backgroundImage?: string
  className?: string
}


export type PromotionalBannerProps = {
  title: string
  subtitle?: string
  buttonText?: string
  backgroundImage: string
  className?: string
}