/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AuctionInfoSheet } from "../referrals/AuctionInfoSheet";

export interface Auction {
  id: string;
  productImg: string;
  productName: string;
  sellerName: string;
  startDate: string;
  timeLeft: string;
  intestedBidders: {
    id: string;
    name: string;
    date: string;
    amount: string;
    avatar: string;
  }[];
  initialBid: number;
  highestBid: number;
}

export const AuctionColumn: ColumnDef<Auction, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="w-[50px] capitalize overflow-hidden ">
          <div className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-[14px]">
            #{id ? id : "---"}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "productImg",
    header: "Product",
    cell: ({ row }) => {
      const { productImg } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {productImg ? (
            <img
              src={productImg}
              alt="profile"
              className="h-[45px] w-[44px] rounded-md object-cover"
            />
          ) : (
            <User className="h-8 w-8" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      const { productName } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {productName ? productName : "---"}
        </div>
      );
    },
  },
  {
    accessorKey: "sellerName",
    header: "Seller ",
    cell: ({ row }) => {
      const { sellerName } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {sellerName ? sellerName : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: "start Date",
    cell: ({ row }) => {
      const { startDate } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {startDate ? startDate : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "timeLeft",
    header: "Time Left",
    cell: ({ row }) => {
      const { timeLeft } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {timeLeft ? timeLeft : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "intestedBiddersUrl",
    header: "Interested Bidders",
    cell: ({ row }) => {
      const { intestedBidders } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {intestedBidders && intestedBidders.length > 0 ? (
            <div className="flex -space-x-2">
              {intestedBidders.map((bidder) => (
                <img
                  key={bidder.id}
                  src={bidder.avatar}
                  alt={bidder.name}
                  className="w-8 h-8 object-cover rounded-md"
                />
              ))}
            </div>
          ) : (
            "---"
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "initialBid",
    header: "Initial Bid",
    cell: ({ row }) => {
      const { initialBid } = row.original;
      return (
        <div className="capitalize truncate max-w-[200px]">
          {initialBid ? initialBid : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "highestBid",
    header: "highest Bid",
    cell: ({ row }) => {
      const { highestBid } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          <div className="bg-[#EE9F0524] text-white rounded-md text-sm text-center h-[39px] w-[75px] flex items-center justify-center px-2">
            {highestBid ? highestBid : "---"}
          </div>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CellAction auction={row.original} />;
    },
  },
];

const CellAction = ({ auction }: { auction: Auction }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <MoreVertical className="h-4 w-4 text-white" />
        </PopoverTrigger>
        <PopoverContent className="w-40 bg-[#007F9314] p-3">
          <ul className="w-full">
            <li className="hover:bg-[#27a6b9] rounded-md p-2 w-full cursor-pointer bg-[#007F93] text-white flex flex-col items-center">
              <AuctionInfoSheet auction={auction} />
            </li>
            <li></li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
