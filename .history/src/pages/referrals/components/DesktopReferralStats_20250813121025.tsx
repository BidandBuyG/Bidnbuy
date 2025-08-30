

const DesktopReferralStats = (stats) => {
  return (
    <div className="hidden md:block mb-8">
        <h2 className="text-white text-xl font-semibold mb-6">Referral Status</h2>
        <div className="space-y-4">

          {/* Total referrals */}
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-[#00707B] cursor-pointer hover:bg-[#013139]/50 transition-colors"
            onClick={() => toggleExpanded("total")}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {expandedItems["total"] ? (
                  <Minus className="w-4 h-4 text-gray-800" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-800" />
                )}
              </div>
              <div>
                <p className="text-white text-base font-semibold">Total referrals</p>
              </div>
            </div>
            <p className="text-white text-base font-semibold">{stats.totalReferrals}</p>
          </div>

          {/* Pending */}
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-[#00707B] cursor-pointer hover:bg-[#013139]/50 transition-colors"
            onClick={() => toggleExpanded("pending")}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {expandedItems["pending"] ? (
                  <Minus className="w-4 h-4 text-gray-800" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-800" />
                )}
              </div>
              <div>
                <p className="text-white text-base font-semibold">Pending</p>
              </div>
            </div>
            <p className="text-white text-base font-semibold">{stats.pendingReferrals}</p>
          </div>

          {/* Rewarded */}
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-[#00707B] cursor-pointer hover:bg-[#013139]/50 transition-colors"
            onClick={() => toggleExpanded("rewarded")}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {expandedItems["rewarded"] ? (
                  <Minus className="w-4 h-4 text-gray-800" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-800" />
                )}
              </div>
              <div>
                <p className="text-white text-base font-semibold">Rewarded</p>
              </div>
            </div>
            <p className="text-white text-base font-semibold">{stats.rewardedReferrals}</p>
          </div>
        </div>
      </div>
  )
}

export default DesktopReferralStats