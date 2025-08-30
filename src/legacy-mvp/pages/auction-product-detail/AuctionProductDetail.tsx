import { useNavigate, useParams } from "react-router-dom";

// import { ProductInfoSection } from "./components/ProductInfoSection"
import { ProductDetails } from "./components/ProductDetails";
import { ProductDescription } from "./components/ProductDescription";
import { ProductInformation } from "./components/ProductInformation";

import { ProductCarousel } from "./components/ProductCarousel";

import { useProductDetail } from "@/hooks/useProductDetail";
import { BidHistorySection } from "./components/BidHistorySection";
import { useAuctionStore } from "@/store/auction-store";
import { ProductSummarySection } from "./components/ProductSummarySection";
import { useState, useEffect } from "react";
import { PlaceBidModal } from "@/features/place-bid-modal/PlaceBidModal";
import { calculateTimeLeft } from "@/lib/calculate-time";


export default function AuctionProductDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  console.log("Slug:", slug);



  // Only subscribe to auction and updateTimeLeft for timer effect
  const auction = useAuctionStore((s) => s.auction);
  const updateTimeLeft = useAuctionStore((s) => s.updateTimeLeft);

  // Get all other values in a single snapshot to avoid multiple subscriptions
  const store = useAuctionStore();
  const { timeLeft, isAuctionEnded, canPlaceBid, bidHistory } = store;

  const [showBidModal, setShowBidModal] = useState(false);

  // Keep countdown timer in sync with store
  useEffect(() => {
    if (!auction) return;
    const interval = setInterval(() => {
      updateTimeLeft(calculateTimeLeft(new Date(auction.endTime)));
    }, 1000);
    // Set initial time left immediately
    updateTimeLeft(calculateTimeLeft(new Date(auction.endTime)));
    return () => clearInterval(interval);
  }, [auction, updateTimeLeft]);

  const {
    data: product,
    isLoading,
    isError,
  } = useProductDetail(slug || "classic-wool-peacoat");
  console.log("Auction Product Data:", product);

  const onReportItemHandler = () =>
    navigate(`/escrow/${slug || "classic-wool-peacoat"}/report-problem`);

  

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError || !product)
    return (
      <div className="text-center py-20 text-red-400 text-xl">
        404 | Product not found
      </div>
    );

  if (!auction) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#01151C" }}
      >
        Loading auction data...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#01151C" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="mb-6 lg:mb-0">
            <ProductCarousel images={product.images} />
          </div>

          <ProductSummarySection
            product={product}
            auction={auction}
            timeLeft={timeLeft}
            isAuctionEnded={isAuctionEnded()}
            canPlaceBid={canPlaceBid()}
            onPlaceBidClick={() => setShowBidModal(true)}
          />
          {/* <ProductInfoSection product={product} /> */}
        </div>

        <div className="mt-8 lg:mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">About this product</h2>
            <button
              onClick={onReportItemHandler}
              className="text-red-400 text-sm underline hover:text-red-300 transition-colors cursor-pointer"
            >
              Report this item
            </button>
          </div>

          <ProductDetails product={product} />

          <ProductDescription details={product.details} />

          <ProductInformation product={product} />

          <BidHistorySection
            bidHistory={bidHistory}
            currentHighestBid={auction.currentBid}
          />
        </div>
      </div>

      <PlaceBidModal
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
      />
    </div>
  );
}
