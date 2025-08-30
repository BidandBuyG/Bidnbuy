/**
 * @file components/referral/referral-stats.tsx
 * @description Component for displaying referral statistics and status.
 */

import { useState } from "react";

import type { ReferralStatsSectionProps } from "../types/referrals";
import DesktopReferralStats from "./DesktopReferralStats";
import MobileReferralStats from "./MobileReferralStats";

/**
 * ReferralStatsSection component displays referral statistics with different layouts for mobile and desktop.
 * @param {ReferralStatsSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered referral stats section.
 */

const ReferralStats = ({ stats }: ReferralStatsSectionProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  /**
   * Toggles the expanded state of a stat item.
   * @param {string} key - The key of the item to toggle.
   */
  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <MobileReferralStats
        stats={stats}
        expandedItems={expandedItems}
        toggleExpanded={toggleExpanded}
      />

      <DesktopReferralStats
        stats={stats}
        expandedItems={expandedItems}
        toggleExpanded={toggleExpanded}
      />
    </>
  );
};

export default ReferralStats;
