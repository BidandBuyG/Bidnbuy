import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "@/services/products";
import { useProductStore, type Product } from "@/store/products";

import DesktopMarketPlace from "./components/DesktopMarketPlace";
import MobileMarketPlace from "./components/MobileMarketPlace";


const Marketplace = () => {
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

    const marketPlaceProps = {
      isLoading,
      recentlyAddedProducts: mappedProducts,
      trendingProducts: mappedProducts,
      gadgetsProducts: mappedProducts,
      recommendedItems: mappedProducts,
      topPicksProducts: mappedProducts,
    };

 

  return (
    <>
      

      <MobileMarketPlace {...marketPlaceProps} />

      <DesktopMarketPlace {...marketPlaceProps} />
    </>
  );
};

export default Marketplace;
