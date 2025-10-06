import { ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

export type Auction = {
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
};

export function AuctionInfoSheet({
  auction,
  trigger,
  side = "right",
}: {
  auction: Auction;
  trigger?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}) {
  const Trigger = trigger ?? <p className="text-sm text-white">View Info</p>;

  return (
    <Sheet>
      <SheetTrigger asChild>{Trigger}</SheetTrigger>
      <SheetContent
        side={side}
        className="flex h-screen w-full flex-col bg-[#00191F]  text-white sm:max-w-md border-[#00191F]"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl">
            <div className="flex items-center gap-3 text-white justify-between w-[80%]">
              <SheetClose className="cursor-pointer">
                <ArrowLeft />
              </SheetClose>

              <div>
                Bid
                <span className="text-[#E8FFFD80]"> Details</span>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4 bg-[#E8FFFD33]" />

        <ScrollArea className="flex-1 w-full pr-4">
          <div className="mt-4 space-y-4 w-full">
            <div className="min-h-screen flex items-center justify-center">
              <div className="rounded-xl overflow-hidden max-w-lg w-full">
                <div className="relative">
                  <img
                    src={auction.productImg}
                    alt="Ethereal Blossoms"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <span className="w-3 h-3 bg-[#FFE14F] rounded-full" />
                    <span className="w-3 h-3 bg-[#FFE14F] rounded-full opacity-70" />
                    <span className="w-3 h-3 bg-[#FFE14F] rounded-full opacity-40" />
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#FFE14F] text-[#052024] font-bold px-2 py-1 rounded text-lg">
                      00
                    </span>
                    <span className="text-[#FFE14F] font-bold">:</span>
                    <span className="bg-[#FFE14F] text-[#052024] font-bold px-2 py-1 rounded text-lg">
                      08
                    </span>
                    <span className="text-[#FFE14F] font-bold">:</span>
                    <span className="bg-[#FFE14F] text-[#052024] font-bold px-2 py-1 rounded text-lg">
                      54
                    </span>
                  </div>
                  <h2 className="text-3xl font-semibold text-white mb-1 leading-tight">
                    {auction.productName}
                  </h2>
                  <p className="text-xl text-white/80 mb-4">
                    {auction.sellerName}
                  </p>
                  <div className="mb-6">
                    <span className="text-white text-2xl font-bold">HB:</span>{" "}
                    <span className="text-[#FFC12F] text-2xl font-bold">
                      {auction.highestBid}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg text-white font-semibold mb-2">
                      Top Bidders
                    </h3>
                    <div className="divide-y divide-white/10 bg-[#00191F]  rounded">
                      {auction.intestedBidders.map((b, i) => (
                        <div
                          key={b.id}
                          className="flex items-center py-4 px-2 gap-4 text-white"
                        >
                          <div className="w-8 text-lg font-bold text-white/80">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <img
                            src={b.avatar}
                            alt={b.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{b.name}</div>
                            <div className="text-sm text-white/50">
                              {b.date}
                            </div>
                          </div>
                          <div className="font-semibold text-right">
                            {b.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
