import { ReactNode } from "react";
import { TopNav } from "./TopNav";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MarketingDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#00191F] flex flex-col">
      {/* Top sticky orange bar */}
      <div className="w-full bg-[#ffb100] text-center text-xs py-1 font-medium text-[#191d1e] sticky top-0 z-40">
        Free shipping on all orders before 30th August
      </div>
      <TopNav />
      <main className="flex-1 px-3 sm:px-6 md:px-8 pt-10 pb-10 w-full mx-auto max-w-[95%]">
        {children}
      </main>
    </div>
  );
}
