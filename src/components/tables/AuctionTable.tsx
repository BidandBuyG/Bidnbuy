/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { ListFilter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import TableIcon from "../../assets/table-tab-icon.svg";
import CardIcon from "../../assets/card-tab-icon.svg";
import { TableSkeleton } from "./TableSkeleton";
import { TableErrorState } from "../referrals/ErrorTableData";
import { TableEmptyState } from "../referrals/EmptyPlaceholder";
import { AuctionInfoSheet } from "../referrals/AuctionInfoSheet";
import EmptyStateImage from "../../assets/user-empty-data.png";
import AuctionItemCard from "./AuctionItemCard";

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
  onPageChange,
  onLimitChange,
  onQueryChange,
}: Props) => {
  const [view, setView] = useState<"table" | "card">("table");

  return (
    <>
      <section aria-labelledby="task-title" className="text-white">
        <div className="mt-4 md:mt-7">
          <div className="mt-8">
            {isLoading && (
              <TableSkeleton
                view={view}
                setView={setView}
                title={
                  <div>
                    <h2>
                      <span>Ongoing</span>{" "}
                      <span className="text-[#748C8D]">Auctions</span>
                    </h2>
                  </div>
                }
                filterBtn={true}
              />
            )}

            {!isLoading && isError && (
              <TableErrorState
                title={
                  <div>
                    <h2>
                      <span>Ongoing</span>{" "}
                      <span className="text-[#748C8D]">Auctions</span>
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
            )}

            {!isLoading && !isError && (
              <>
                {data.length ? (
                  <>
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
                      searchKey="category"
                      button={
                        <Button className="bg-[#002129] hover:bg-[#007F93] text-white flex items-center gap-2">
                          <ListFilter />
                          Filters
                        </Button>
                      }
                      externalTabs={
                        <Tabs
                          value={view}
                          onValueChange={(val) =>
                            setView(val as "table" | "card")
                          }
                        >
                          <TabsList className="mt-3 bg-transparent gap-3">
                            <TabsTrigger value="table">
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
                            {data.map((aution) => (
                              <div key={aution.id} className="">
                                <AuctionItemCard
                                  data={aution}
                                  button={
                                    <AuctionInfoSheet
                                      auction={aution}
                                      trigger={
                                        <button
                                          type="button"
                                          className="bg-[#1894A2] text-white px-6 py-2 rounded-lg font-medium text-lg transition hover:bg-[#117484] focus:outline-none"
                                        >
                                          View More
                                        </button>
                                      }
                                    />
                                  }
                                />
                              </div>
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
                    />
                  </>
                ) : (
                  <TableEmptyState
                    view={view}
                    setView={setView}
                    imgSrc={EmptyStateImage}
                    title={
                      <div>
                        <h2>
                          <span>Ongoing</span>{" "}
                          <span className="text-[#748C8D]">Auctions</span>
                        </h2>
                      </div>
                    }
                    filterBtn={true}
                    description={
                      <div className="flex flex-col items-center text-center">
                        <h2 className="text-lg font-medium text-white">
                          There is no ongoing auction.
                          <br />
                          Kindly check back later.
                        </h2>

                        <Button
                          type="submit"
                          className="w-1/2 bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-7"
                          onClick={() => window.location.reload()}
                        >
                          Refresh page
                        </Button>
                      </div>
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
