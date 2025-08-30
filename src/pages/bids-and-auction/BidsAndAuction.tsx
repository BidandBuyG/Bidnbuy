import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Product } from "@/types/product";

import { useProductStore } from "@/store/products";
import { fetchProducts } from "@/services/products";

import BidsAndAuctionMobile from "./components/BidsAndAuctionMobile";
import BidsAndAuctionDesktop from "./components/BidsAndAuctionDesktop";

/**
 * Main auctions page component
 * Uses Tailwind responsive classes to render appropriate layout for each screen size
 * Eliminates the need for JavaScript-based screen size detection
 */

const BidsAndAuction = () => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const actionTypes = ["buy", "bid", "offer"] as const;
  const mapProductToUI = (product: Product, idx: number) => ({
    image:
      Array.isArray(product.files) && product.files.length > 0
        ? product.files[0]
        : "",
    title: product.itemName,
    rating: 5,
    reviews: 0,
    price:
      product.discountPrice && product.discountPrice !== product.basePrice
        ? `$${product.discountPrice}`
        : `$${product.basePrice}`,
    originalPrice:
      product.discountPrice && product.discountPrice !== product.basePrice
        ? `$${product.basePrice}`
        : undefined,
    actionType: actionTypes[idx % actionTypes.length],
  });

  const mappedProducts = products.map(mapProductToUI);

  const bidsAndAuctionProps = {
    isLoading,
    recentlyAddedProducts: mappedProducts,
    trendingProducts: mappedProducts,
    gadgetsProducts: mappedProducts,
    recommendedItems: mappedProducts,
    topPicksProducts: mappedProducts,
  };
  
  return (
    <>
      <BidsAndAuctionMobile {...bidsAndAuctionProps} />
      <BidsAndAuctionDesktop {...bidsAndAuctionProps} />
    </>
  );
};

export default BidsAndAuction;
