import type { CategoryProductProps } from "@/types/product";

import LoadingGrid from "@/components/loading-grid/LoadingGrid";
import ProductGrid from "@/components/shared/product/ProductGrid";
import PromotionalBanner from "@/components/shared/product/PromotionalBanner";

import AuctionCategoryImages from "./AuctionCategoryImages";
import AuctionHeroBanner from "./AuctionHeroBanner";

import BidsAndAuctionPromotionalBanner from "../assets/auction-promo-banner.jpg";

const BidsAndAuctionMobile = ({
  isLoading,
  recentlyAddedProducts,
  trendingProducts,
  gadgetsProducts,
  recommendedItems,
  topPicksProducts,
}: CategoryProductProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#01151C] text-white lg:hidden">
      <main className="flex-1 overflow-auto">
        <div className="flex flex-col gap-6 pb-6 pt-4">
          <AuctionHeroBanner />

          <AuctionCategoryImages />

          {isLoading ? (
            <LoadingGrid />
          ) : (
            <>
              <ProductGrid
                title="Popular Auction Items"
                products={recentlyAddedProducts}
                columns={2}
              />

              <ProductGrid
                title="Gadget Items"
                products={trendingProducts}
                columns={2}
              />

              <ProductGrid
                title="Electronics Auction"
                products={recentlyAddedProducts}
                columns={2}
              />

              <ProductGrid
                title="Fashion Auction"
                products={trendingProducts}
                columns={2}
              />

              <PromotionalBanner
                title="Let Buyers Compete For Your Product"
                backgroundImage={BidsAndAuctionPromotionalBanner}
                buttonText="List Now"
              />

              <ProductGrid
                title="Home And Auction Kitchen Store"
                products={gadgetsProducts}
                columns={2}
              />

              <ProductGrid
                title="Beauty Care Auction"
                products={recommendedItems}
                columns={2}
              />

              <ProductGrid
                title="Library Auction"
                products={topPicksProducts}
                columns={2}
              />

              <ProductGrid
                title="Automobile Auction"
                products={topPicksProducts}
                columns={2}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BidsAndAuctionMobile;
