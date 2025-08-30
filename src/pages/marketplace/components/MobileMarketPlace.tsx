import type { CategoryProductProps } from "@/types/product"

import LoadingGrid from "@/components/loading-grid/LoadingGrid"
import ProductGrid from "@/components/shared/product/ProductGrid"

import MarketplaceHeroBanner from "./MarketplaceHeroBanner"
import PromotionalBanner from "@/components/shared/product/PromotionalBanner"


import MarketPlaceHeroImage from "../assets/marketplace-hero.png"
import MarketPlacePromotionalImage from "../assets/marketplace-hero-img.jpg"
import MarketPlacePromotionalBooksImg from "../assets/marketplace-books.jpg"


const MobileMarketPlace = ({
  isLoading,
  recentlyAddedProducts,
  trendingProducts,
  gadgetsProducts,
  recommendedItems,
  topPicksProducts,
}: CategoryProductProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#01151C] text-white md:hidden">
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col gap-6 pb-6 pt-4">
            <MarketplaceHeroBanner backgroundImage={MarketPlaceHeroImage} />

            {isLoading ? (
              <LoadingGrid />
            ) : (
              <>
                <ProductGrid
                  title="Recently added products"
                  products={recentlyAddedProducts}
                  columns={2}
                />

                <ProductGrid
                  title="Trending on BidnBuy"
                  products={trendingProducts}
                  columns={2}
                />

                <PromotionalBanner
                title="Specially Packed for the Girlies"
                backgroundImage={MarketPlacePromotionalImage}
              />

                <ProductGrid
                  title="Gadgets(New, Used, Refurbished)"
                  products={gadgetsProducts}
                  columns={2}
                />

                <PromotionalBanner
                title="All Book Lovers Shop Here"
                backgroundImage={MarketPlacePromotionalBooksImg}
              />

                <ProductGrid
                  title="Recommended Items"
                  products={recommendedItems}
                  columns={2}
                />

                <ProductGrid
                  title="Top Picks For You"
                  products={topPicksProducts}
                  columns={2}
                />
              </>
            )}
          </div>
        </div>
      </div>
  )
}

export default MobileMarketPlace