import HeaderLink from "../HeaderLink";

export function BottomSectionLinks() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center overflow-hidden -ml-3">
      {/* Big text left */}

      <div className="flex items-center pointer-events-none select-none">
        <p className="text-[8vw] md:text-[173px] text-[#2E474C] font-bold opacity-40">
          Bid<span className="text-[#2C2C2C]">&amp;</span>Buy
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row w-full justify-end ml-auto flex-1 gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-2/5">
          <HeaderLink label="Overview" href="/overview" />
          <HeaderLink label="Add User" href="/marketing/add-user" />
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-2/5 mt-4 md:mt-0 md:ml-10">
          <HeaderLink label="My Referrals" href="/marketing/referrals" />
          <HeaderLink label="My Wallet" href="#" />
        </div>
      </div>
    </div>
  );
}
