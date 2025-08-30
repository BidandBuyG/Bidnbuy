export type UIProduct = {
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice?: string;
  actionType: "buy" | "bid" | "offer";
};

export type CategoryProductProps = {
  isLoading: boolean;
  recentlyAddedProducts: UIProduct[];
  trendingProducts: UIProduct[];
  gadgetsProducts: UIProduct[];
  recommendedItems: UIProduct[];
  topPicksProducts: UIProduct[];
}



export type Product = {
  itemName: string;
  slug: string;
  basePrice: number;
  discountPrice: number;
  details: string;
  files: string[];
  category: string;
  offers: string[];
  itemsInStock: number;
  isApproved: boolean;
  variants: {
    attributes: Record<string, string>;
    price: number;
    itemsInStock: number;
  }[];
};

export type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};