export function ProductInformation({ product }: { product: any }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Product Information</h3>
        <div className="bg-teal-500/20 border border-teal-500/30 rounded-full px-3 py-1">
          <button className="text-teal-400 text-sm font-medium flex items-center gap-1 hover:text-teal-300 transition-colors">
            See more
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

     
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 overflow-hidden">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Location:</td>
              <td className="px-4 py-3 text-white font-medium">Lagos, Nigeria</td>
            </tr>

            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Number of bids:</td>
              <td className="px-4 py-3 text-white font-medium">10</td>
            </tr>
            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Closes in:</td>
              <td className="px-4 py-3 text-white font-medium">5 days</td>
            </tr>
            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Auction started:</td>
              <td className="px-4 py-3 text-white font-medium">05-09-2025 12:00pm</td>
            </tr>
            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Auction closes:</td>
              <td className="px-4 py-3 text-white font-medium">05-14-2025 11:00pm</td>
            </tr>
            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Auction id:</td>
              <td className="px-4 py-3 text-white font-medium">{product._id || "N/A"}</td>
            </tr>
            <tr className="border-b border-slate-700/30">
              <td className="px-4 py-3 text-gray-400 font-medium border-r border-slate-700/30">Shipping Cost:</td>
              <td className="px-4 py-3 text-white font-medium">${product.basePrice || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
