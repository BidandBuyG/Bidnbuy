import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "../../assets/bidnbuy-logo-2.png";
import NotificationIcon from "../../assets/notification.svg";
import SettingsIcon from "../../assets/settings.svg";
import WalletIcon from "../../assets/wallet-icon.svg";
import ReferralIcon from "../../assets/referral-icon.svg";
import OverviewIcon from "../../assets/overview-icon.svg";
import UserIcon from "../../assets/user-icon.svg";
import AuctionIcon from "../../assets/auction-icon.svg";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Overview", icon: OverviewIcon, href: "/overview" },
  { label: "Add User", icon: UserIcon, href: "/marketing/add-user" },
  { label: "My referrals", icon: ReferralIcon, href: "/marketing/referrals" },
  { label: "Ongoing Auctions", icon: AuctionIcon, href: "/marketing/auctions" },
  { label: "My Wallet", icon: WalletIcon, href: "/wallet" },
];

export function TopNav() {
  return (
    <nav className="w-full max-w-[95%] mx-auto px-2 sm:px-6 md:px-8 py-6 flex items-center justify-between relative z-30">
      {/* Logo (left) */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <img src={Logo} alt="Logo" className="h-[60px] w-[80px]" />
      </div>
      {/* Center nav links */}
      <div className="flex-1 flex justify-center items-center gap-3 sm:gap-5">
        {navItems.map(({ label, icon, href }) => {
          const isActive = location.pathname === href; // exact match
          return (
            <Button
              key={label}
              variant="ghost"
              className={cn(
                "flex gap-1 sm:gap-2 items-center px-3 sm:px-4 py-2 rounded-lg font-semibold text-[14px] sm:text-base transition-all h-[44px] hover:text-white hover:bg-[#002129]/50",
                isActive
                  ? "bg-[#007F93] text-white" // active styles
                  : "text-[#e6fcf7] bg-[#002129]"
              )}
              asChild
            >
              <Link to={href}>
                <img src={icon} className="h-[16px] w-[22.5px]" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
      {/* Right side: icons and profile */}
      <div className="flex items-center gap-2 min-w-[220px] justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md border border-[#18343e] hover:bg-[#18343e] p-2 w-[44px] h-[45px]"
        >
          <img src={NotificationIcon} className="" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md border border-[#18343e] hover:bg-[#18343e] p-2 w-[44px] h-[45px]"
        >
          <img src={SettingsIcon} className="" />
        </Button>
        <div className="flex items-center gap-2 px-2">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=100&h=60&fit=crop"
            alt="Avatar"
            className="rounded-md w-[44px] h-[43px] object-cover"
          />
          <div>
            <div className="text-white text-sm font-semibold leading-tight">
              Steward Menzies
            </div>
            <div className="text-[#28d9c3] text-xs leading-tight">Manager</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
