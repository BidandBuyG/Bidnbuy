import DashboardHeroImg from "@/assets/products/dashboard-hero.jpg"

export function ProductHeroSection() {
  return (
    <div className="px-6 py-6">
      <div className="flex gap-6">

        <div className="flex-1">
          <div className="relative rounded-lg overflow-hidden h-64">
            <img src={DashboardHeroImg} alt="All Gadgets Available For You" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-opacity-30">
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <h1 className="text-4xl font-bold text-white mb-4">ALL GADGETS AVAILABLE FOR YOU</h1>
                <button className="bg-[#DC4822] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-52 bg-[#00222E] rounded-lg p-4">
          <nav className="space-y-1">
            <div className="flex items-center gap-3 text-orange-400 bg-[#004755] px-3 py-2.5 rounded-md">
              <span className="text-base">⭐</span>
              <span className="text-sm font-medium">Trending Deals</span>
            </div>
            <div className="flex items-center gap-3 text-yellow-400 hover:bg-[#004755] px-3 py-2.5 rounded-md cursor-pointer transition-colors">
              <span className="text-base">😊</span>
              <span className="text-sm">Discover New</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 hover:bg-[#004755] px-3 py-2.5 rounded-md cursor-pointer transition-colors">
              <span className="text-base">🤍</span>
              <span className="text-sm">Watchlist</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 hover:bg-[#004755] px-3 py-2.5 rounded-md cursor-pointer transition-colors">
              <span className="text-base">🔍</span>
              <span className="text-sm">Top Searches</span>
            </div>
            <div className="flex items-center gap-3 text-orange-600 hover:bg-[#004755] px-3 py-2.5 rounded-md cursor-pointer transition-colors">
              <span className="text-base">⏳</span>
              <span className="text-sm">Ending Soon</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
