import { BottomSectionLinks } from "@/components/layout/BottomSectionLinks";
import { MarketingDashboardLayout } from "@/components/layout/MarketingDashboardLayout";
import MarketingStats from "../components/MarketingStats";
import Header from "@/components/Header";
import Auction from "../components/Auction";

export default function OverviewPage() {
  return (
    <MarketingDashboardLayout>
      {/* Heading */}
      <Header firstText="Overview" greyText="Dashboard" />
      {/* Metric Cards */}
      <div className="mb-[3em]">
        <MarketingStats />
      </div>

      <div className="mb-8">
        <Auction />
      </div>

      {/* Bottom Section */}
      <BottomSectionLinks />
    </MarketingDashboardLayout>
  );
}
