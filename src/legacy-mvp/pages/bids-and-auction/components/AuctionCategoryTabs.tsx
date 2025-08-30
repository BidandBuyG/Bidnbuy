import type { CategoryTab } from "../types/category-tabs"


type AuctionCategoryTabsProps = {
  categories: CategoryTab[]
  onCategoryChange?: (categoryId: string) => void
  className?: string
}

const AuctionCategoryTabs = ({ categories, onCategoryChange, className = "" }: AuctionCategoryTabsProps) => {
  return (
   
    <div className={`hidden lg:block px-6 mb-6 ${className}`}>
      <div className="flex gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange?.(category.id)}
            className={`
              px-6 py-2.5 rounded-md text-base font-medium whitespace-nowrap transition-colors
              ${category.active 
                ? "bg-[#00707B] text-white" 
                : "bg-[#004755] text-white hover:bg-[#00545F]"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AuctionCategoryTabs;
