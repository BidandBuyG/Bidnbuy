import HomeInteriorImage from "../assets/home-interior.png"
import GadgetImage from "../assets/gadget-product.png"
import FashionImage from "../assets/fashion.png"
import AppliancesImage from "../assets/appliances.jpg"
import AutoMobileImage from "../assets/automobile-image.jpg"
import FurnitureImage from "../assets/furniture-image.jpg"

const AuctionCategoryImages = () => {
  const categories = [
    {
      id: "home-decor",
      image: HomeInteriorImage,
      title: "Home & Decor",
    },
    {
      id: "electronics",
      image: GadgetImage, 
      title: "Electronics",
    },
    {
      id: "fashion",
      image: FashionImage ,
      title: "Fashion",
    },
    {
      id: "jewelry",
      image: AppliancesImage,
      title: "Jewelry",
    },
    {
      id: "automotive", 
      image: AutoMobileImage,
      title: "Automotive",
    },
    {
      id: "collectibles",
      image: FurnitureImage,
      title: "Collectibles",
    },
  ]

  return (
    <div className="px-4 lg:px-6 mb-6">
     
      <div className="grid grid-cols-4 gap-3 lg:hidden">
        {categories.slice(0, 4).map((category) => (
          <button
            key={category.id}
            className="group flex flex-col items-center"
            onClick={() => {
              console.log(`Selected category: ${category.title}`)
            }}
          >
          
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200 group-hover:scale-105 transition-transform duration-200">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
            
      
            <p className="text-xs text-white text-center mt-1.5 font-medium leading-tight">
              {category.title}
            </p>
          </button>
        ))}
      </div>

 
      <div className="hidden lg:grid lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="group flex flex-col items-center"
            onClick={() => {
              console.log(`Selected category: ${category.title}`)
            }}
          >
           
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200 group-hover:scale-105 transition-transform duration-200">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
           
            <p className="text-sm text-white text-center mt-2 font-medium">
              {category.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AuctionCategoryImages;