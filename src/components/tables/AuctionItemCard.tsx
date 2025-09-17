/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type AuctionItemCardProps = {
  data: any;
  button: React.ReactNode;
};

const AuctionItemCard: React.FC<AuctionItemCardProps> = ({ data, button }) => {
  return (
    <div className="bg-[#092224] rounded-xl overflow-hidden max-w-md w-full shadow-2xl border-2 border-[#052024]">
      <div className="relative">
        <img
          src={data.productImg}
          alt={data.productName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          {[...Array(3)].map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 bg-[#FFE14F] rounded-full ${
                idx === 1 ? "" : idx === 1 ? "opacity-70" : "opacity-40"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">
              {data.productName}
            </h2>
            <p className="text-base text-white/80">{data.sellerName}</p>
          </div>
          <div className="flex flex-col items-center">
            {data.intestedBidders && data.intestedBidders.length > 0 ? (
              <div className="flex -space-x-2">
                {data.intestedBidders.map((bidder: any) => (
                  <img
                    key={bidder.id}
                    src={bidder.avatar}
                    alt={bidder.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                ))}
              </div>
            ) : (
              "---"
            )}

            <span className="text-white/80 text-xs">
              ({data.intestedBidders.length} bids)
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-2 mb-2">
          {/* <span className="bg-[#FFE14F] text-[#052024] font-bold px-2 py-1 rounded text-lg">
            {h}
          </span>
          <span className="text-[#FFE14F] font-bold">:</span>
          <span className="bg-[#FFE14F] text-[#052024] font-bold px-2 py-1 rounded text-lg">
            {m}
          </span>
          <span className="text-[#FFE14F] font-bold">:</span>
          <span className="bg-[#FFE14F] text-[#052024] font-bold px-2 py-1 rounded text-lg">
            {s}
          </span> */}
        </div>
        <div className="mb-4">
          <span className="text-white text-xl font-bold">HB:</span>{" "}
          <span className="text-[#FFC12F] text-xl font-bold">
            {data.highestBid}
          </span>
        </div>
        <div className="flex justify-end">{button}</div>
      </div>
    </div>
  );
};

export default AuctionItemCard;
