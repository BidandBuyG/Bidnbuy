import { NavLink } from "react-router-dom";
import { MenuSquare, UserPlus, Users, Layers, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: <MenuSquare />, to: "/" },
  { label: "Add User", icon: <UserPlus />, to: "/add-user" },
  { label: "My referrals", icon: <Users />, to: "/referrals" },
  { label: "Ongoing Auctions", icon: <Layers />, to: "/auctions" },
  { label: "My Wallet", icon: <Wallet />, to: "/wallet" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[220px] bg-[#112d34] border-r border-[#15323c] pt-10 px-4">
      <div className="flex items-center gap-3 mb-10 pl-2">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-white">BidnBuy</span>
      </div>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-base transition-all",
                isActive
                  ? "bg-[#28d9c3] text-[#0c222a]"
                  : "text-[#e6fcf7] hover:bg-[#15323c] hover:text-[#28d9c3]"
              )
            }
          >
            <span className="icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto py-8 text-xs text-[#4aa6a1]">
        &copy; {new Date().getFullYear()} BidnBuy
      </div>
    </aside>
  );
}
