import type { MarketPlaceProps } from "../types/marketplace";

import LoadingGrid from "@/components/loading-grid/LoadingGrid";
import ProductGrid from "@/components/shared/product/ProductGrid";
import PromotionalBanner from "@/components/shared/product/PromotionalBanner";

import MarketplaceHeroBanner from "./MarketplaceHeroBanner";

import MarketPlaceHeroImage from "../assets/marketplace-hero.png";
import MarketPlacePromotionalImage from "../assets/marketplace-hero-img.jpg";
import MarketPlacePromotionalBooksImg from "../assets/marketplace-books.jpg";


const DesktopMarketPlace = ({
  isLoading,
  recentlyAddedProducts,
  trendingProducts,
  gadgetsProducts,
  recommendedItems,
  topPicksProducts,
}: MarketPlaceProps) => {
  return (
    <div className="min-h-screen bg-[#01151C] text-white hidden md:block">
      <div className="px-6 py-6">
        <MarketplaceHeroBanner backgroundImage={MarketPlaceHeroImage} />
        {isLoading ? (
          <LoadingGrid />
        ) : (
          <>
            <ProductGrid
              title="Recently added products"
              products={recentlyAddedProducts}
              columns={4}
            />
            <ProductGrid
              title="Trending on BidnBuy"
              products={trendingProducts}
              columns={4}
            />
            <PromotionalBanner
              title="Specially Packed for the Girlies"
              backgroundImage={MarketPlacePromotionalImage}
            />
            <ProductGrid
              title="Gadgets(New, Used, Refurbished)"
              products={gadgetsProducts}
              columns={4}
            />
            <PromotionalBanner
              title="All Book Lovers Shop Here"
              backgroundImage={MarketPlacePromotionalBooksImg}
            />
            <ProductGrid
              title="Recommended Items"
              products={recommendedItems}
              columns={4}
            />
            <ProductGrid
              title="Top Picks For You"
              products={topPicksProducts}
              columns={4}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default DesktopMarketPlace