import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
import Logo from "../../assets/bidnbuy-logo-2.png";
import NotificationIcon from "../../assets/notification.svg";
import SettingsIcon from "../../assets/settings.svg";
import WalletIcon from "../../assets/wallet-icon.svg";
import ReferralIcon from "../../assets/referral-icon.svg";
import OverviewIcon from "../../assets/overview-icon.svg";
import UserIcon from "../../assets/user-icon.svg";
import AuctionIcon from "../../assets/auction-icon.svg";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: OverviewIcon, href: "/overview" },
  { label: "Add User", icon: UserIcon, href: "/marketing/add-user" },
  { label: "My referrals", icon: ReferralIcon, href: "/marketing/referrals" },
  { label: "Ongoing Auctions", icon: AuctionIcon, href: "/marketing/auctions" },
  { label: "My Wallet", icon: WalletIcon, href: "/wallet" },
];

export function TopNav() {
  return (
    <nav className="w-full max-w-[98%] mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="h-[60px] w-[80px] sm:h-[50px] sm:w-[70px] object-fill"
        />
      </div>

      {/* Center: Desktop Nav */}
      <div className="hidden lg:flex flex-1 justify-center gap-4 lg:gap-6">
        {navItems.map(({ label, href }) => {
          const isActive = location.pathname === href; // exact match
          return (
            <Button
              key={label}
              variant="ghost"
              className={cn(
                "flex gap-1 sm:gap-2 items-center px-3 sm:px-4 py-2 rounded-lg font-semibold text-[14px] sm:text-base transition-all h-[44px] hover:text-white ",
                isActive
                  ? "bg-[#007F93] text-white hover:bg-[#007F93]"
                  : "text-[#e6fcf7] bg-[#002129] hover:bg-[#002129]/50"
              )}
              asChild
            >
              <Link to={href}>{label}</Link>
            </Button>
          );
        })}
      </div>

      {/* Right: Profile + Icons */}
      <div className="hidden lg:flex items-center gap-3">
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
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=100&h=60&fit=crop"
            alt="Avatar"
            className="rounded-md w-9 h-9 object-cover"
          />
          <div className="hidden lg:block">
            <div className="text-white text-sm font-semibold">Steward</div>
            <div className="text-[#28d9c3] text-xs">Manager</div>
          </div>
        </div>
      </div>

      {/* Mobile Nav: Hamburger */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#002129] text-white border-[#00191F]"
          >
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map(({ label, href }) => {
                const isActive = location.pathname === href; // exact match
                return (
                  <Button
                    key={label}
                    variant="ghost"
                    className={cn(
                      "flex gap-1 sm:gap-2 justify-start px-3 sm:px-4 py-2 rounded-lg font-semibold text-[14px] sm:text-base transition-all h-[44px] hover:text-white hover:bg-[#007F93]",
                      isActive
                        ? "bg-[#007F93] text-white"
                        : "text-[#e6fcf7] bg-[#002129]"
                    )}
                    asChild
                  >
                    <Link to={href}>{label}</Link>
                  </Button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
