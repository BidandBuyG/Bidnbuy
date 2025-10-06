/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { ListFilter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import TableIcon from "../../assets/table-tab-icon.svg";
import CardIcon from "../../assets/card-tab-icon.svg";
import { TableErrorState } from "../referrals/ErrorTableData";
import { AuctionInfoSheet } from "../referrals/AuctionInfoSheet";
import EmptyStateImage from "../../assets/user-empty-data.png";
import AuctionItemCard from "./AuctionItemCard";
import { CardSkeleton } from "./CardSkeleton";

interface Auction {
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

interface Props {
  data: Auction[];
  auctionColumns: any;
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;

  page: number;
  totalPages: number;
  limit: number;
  query: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onQueryChange: (query: string) => void;
}

export const AuctionTable = ({
  data,
  auctionColumns,
  isLoading,
  isError = false,
  errorMessage,
  onRetry,
  page,
  limit,
  query,
  totalPages,
  onPageChange,
  onLimitChange,
  onQueryChange,
}: Props) => {
  const [view, setView] = useState<"table" | "card">("table");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setView("card"); // lg breakpoint
    };

    handleResize(); // Run once at mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section aria-labelledby="task-title" className="text-white">
        <div className="mt-4 md:mt-7">
          <div className="mt-8">
            {isError ? (
              <TableErrorState
                title={
                  <div>
                    <h2>
                      <span>My</span>{" "}
                      <span className="text-[#748C8D]">Referrals</span>
                    </h2>
                  </div>
                }
                filterBtn={true}
                view={view}
                setView={setView}
                errorMessage={
                  errorMessage || "There was an error fetching resources."
                }
                onRetry={onRetry ?? (() => {})}
              />
            ) : (
              <DataTable
                data={data}
                header={
                  <div>
                    <h2>
                      <span>Ongoing</span>{" "}
                      <span className="text-[#748C8D]">Auctions</span>
                    </h2>
                  </div>
                }
                columns={auctionColumns}
                totalPages={totalPages}
                button={
                  <Button className="bg-[#002129] hover:bg-[#007F93] text-white flex items-center gap-2">
                    <ListFilter />
                    Filters
                  </Button>
                }
                EmptyStateImage={EmptyStateImage}
                EmptyStateDescription={
                  <div className="text-center flex flex-col items-center gap-3">
                    <p className="text-lg">
                      You have no ongoing auctions at the moment.
                    </p>
                    <p className="text-lg">Start bidding now!</p>
                  </div>
                }
                externalTabs={
                  <Tabs
                    value={view}
                    onValueChange={(val) => setView(val as "table" | "card")}
                  >
                    <TabsList className="mt-3 bg-transparent gap-3">
                      <TabsTrigger value="table" className="hidden lg:flex">
                        <div className="flex items-center gap-2">
                          <img
                            src={TableIcon}
                            alt="Table View"
                            className="h4 w-4"
                          />{" "}
                          Table View
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="card">
                        <div className="flex items-center gap-2">
                          <img
                            src={CardIcon}
                            alt="Card View"
                            className="h4 w-4"
                          />{" "}
                          Card View
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                }
                hideTableBody={view === "card"}
                customContent={
                  view === "card" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-[2em] border-t border-[#E8FFFD33]">
                      {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <CardSkeleton key={i} />
                          ))
                        : data.map((aution) => (
                            <AuctionItemCard
                              key={aution.id}
                              data={aution}
                              button={
                                <AuctionInfoSheet
                                  auction={aution}
                                  trigger={
                                    <button
                                      type="button"
                                      className="bg-[#1894A2] text-white px-6 py-2 rounded-lg font-medium text-lg transition hover:bg-[#117484] focus:outline-none cursor-pointer"
                                    >
                                      View More
                                    </button>
                                  }
                                />
                              }
                            />
                          ))}
                    </div>
                  ) : undefined
                }
                page={page}
                limit={limit}
                query={query}
                onPageChange={onPageChange}
                onLimitChange={onLimitChange}
                onQueryChange={onQueryChange}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
