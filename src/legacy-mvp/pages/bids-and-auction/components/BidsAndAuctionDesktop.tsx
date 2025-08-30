import { useState } from "react";

import type { CategoryProductProps } from "@/types/product";

import { auctionCategories } from "../auction-data";

import LoadingGrid from "@/components/loading-grid/LoadingGrid";
import ProductGrid from "@/components/shared/product/ProductGrid";
import PromotionalBanner from "@/components/shared/product/PromotionalBanner";

import AuctionCategoryImages from "./AuctionCategoryImages";
import AuctionCategoryTabs from "./AuctionCategoryTabs";
import AuctionHeroBanner from "./AuctionHeroBanner";

import BidsAndAuctionPromotionalBanner from "../assets/auction-promo-banner.jpg";

const BidsAndAuctionDesktop = ({
  isLoading,
  recentlyAddedProducts,
  trendingProducts,
  gadgetsProducts,
  recommendedItems,
  topPicksProducts,
}: CategoryProductProps) => {
  
    const [activeCategory, setActiveCategory] = useState("daily-deals");

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const categoriesWithActiveState = auctionCategories.map((category) => ({
    ...category,
    active: category.id === activeCategory,
  }));
  return (
    <div className="hidden lg:block min-h-screen bg-[#01151C] text-white">
      <main className="px-6 py-6">
    
          <AuctionHeroBanner />

          <AuctionCategoryImages />

          <AuctionCategoryTabs
            categories={categoriesWithActiveState}
            onCategoryChange={handleCategoryChange}
          />

          {isLoading ? (
            <LoadingGrid />
          ) : (
            <>
              <ProductGrid
                title="Popular Auction Items"
                products={recentlyAddedProducts}
                columns={4}
              />

              <ProductGrid
                title="Gadget Items"
                products={trendingProducts}
                columns={4}
              />

              <ProductGrid
                title="Electronics Auction"
                products={recentlyAddedProducts}
                columns={4}
              />

              <ProductGrid
                title="Fashion Auction"
                products={trendingProducts}
                columns={4}
              />

              <PromotionalBanner
                title="Let Buyers Compete For Your Product"
                backgroundImage={BidsAndAuctionPromotionalBanner}
                buttonText="List Now"
              />

              <ProductGrid
                title="Home And Auction Kitchen Store"
                products={gadgetsProducts}
                columns={4}
              />

              <ProductGrid
                title="Beauty Care Auction"
                products={recommendedItems}
                columns={4}
              />

              <ProductGrid
                title="Library Auction"
                products={topPicksProducts}
                columns={4}
              />

              <ProductGrid
                title="Automobile Auction"
                products={topPicksProducts}
                columns={4}
              />
            </>
          )}
     
      </main>
    </div>
  );
};

export default BidsAndAuctionDesktop;
