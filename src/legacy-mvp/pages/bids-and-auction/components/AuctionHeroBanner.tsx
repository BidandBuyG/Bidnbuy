import { SearchBar } from '@/components/search-bar/SearchBar'

import AuctionHero from "@/assets/products/bids-image.jpg"


const AuctionHeroBanner = () => {
  return (
    <div className="relative rounded-lg overflow-hidden h-48 lg:h-64 mb-6 mx-4">
      

      <div className="">
        <img
          src={AuctionHero}
          alt="Auction Hero Desktop"
          className="w-full h-full object-cover"
        />
      </div>

 
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 lg:px-8">
   
        <div className="mb-2 lg:mb-4">
          <h1 className="text-xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
            Discover all you have been
            <br />
            looking for!
          </h1>
          <p className="text-sm lg:text-xl text-white font-medium">
            Start searching, Start now
          </p>
        </div>

        <div className="w-full max-w-md lg:max-w-lg">
            <SearchBar />
         
        </div>
      </div>
    </div>
  )
}

export default AuctionHeroBanner;
