import AntiquePerfumeImg from "@/assets/products/antique-perfume-img.png"
import SmartTvImg from "@/assets/products/smart-tv.jpg"
import FashionImg from "@/assets/products/fashion-img.jpg"
import WashingMachineImg from "@/assets/products/washing-machine-img.jpg"

export function MobileDiscoverSection() {
  const categories = [
    {
      image: WashingMachineImg,
      title: "Home & Kitchen",
      subtitle: "Appliances & More",
    },
    {
      image: FashionImg,
      title: "Fashion",
      subtitle: "Bags & Accessories",
    },
    {
      image: SmartTvImg,
      title: "Electronics",
      subtitle: "Gadgets & Tech",
    },
    {
      image: AntiquePerfumeImg,
      title: "Beauty",
      subtitle: "Cosmetics & Care",
    },
  ]

  return (
    <div className="px-4">
      <h2 className="text-lg font-medium mb-3">Discover more on BidBuy</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden h-24 bg-[#004755]">
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end p-2">
              <h3 className="text-white font-semibold text-xs">{category.title}</h3>
              <p className="text-gray-200 text-xs opacity-90">{category.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
