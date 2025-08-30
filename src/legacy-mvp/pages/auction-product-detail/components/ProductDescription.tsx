export function ProductDescription({ details }: { details: string }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Product Description</h3>
        <div className="bg-teal-500/20 border border-teal-500/30 rounded-full px-3 py-1">
          <button className="text-teal-400 text-sm font-medium flex items-center gap-1 hover:text-teal-300 transition-colors">
            See more
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        {details || `Crafted with exquisite attention to detail, the Hermes Birkin Bag is the ultimate symbol of luxury and timeless style. Handmade in France by expert artisans, each bag is a masterpiece, featuring premium leather, signature saddle stitching, and high-quality palladium or gold-plated hardware...`}
      </p>
    </div>
  )
}
