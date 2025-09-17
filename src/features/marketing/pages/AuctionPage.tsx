import { MarketingDashboardLayout } from "@/components/layout/MarketingDashboardLayout";
import React from "react";
import Auction from "../components/Auction";
import { BottomSectionLinks } from "@/components/layout/BottomSectionLinks";

const AuctionPage = () => {
  return (
    <MarketingDashboardLayout>
      <Auction />

      <BottomSectionLinks />
    </MarketingDashboardLayout>
  );
};

export default AuctionPage;
