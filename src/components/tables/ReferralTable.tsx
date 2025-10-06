/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { ListFilter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import TableIcon from "../../assets/table-tab-icon.svg";
import CardIcon from "../../assets/card-tab-icon.svg";
import ReferralCardData from "./ReferralCardData";
import { TableErrorState } from "../referrals/ErrorTableData";
import { ReferralInfoSheet } from "../referrals/ReferralInfoSheet";
import EmptyStateImage from "../../assets/emptyImg.png";
import { CardSkeleton } from "./CardSkeleton";

interface Referral {
  id: string;
  profileImg: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  category: string;
}

interface Props {
  data: Referral[];
  referralColumns: any;
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

export const ReferralTable = ({
  data,
  referralColumns,
  isLoading,
  isError = false,
  errorMessage,
  onRetry,
  page,
  totalPages,
  limit,
  query,
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
                      <span>My</span>{" "}
                      <span className="text-[#748C8D]">Referrals</span>
                    </h2>
                  </div>
                }
                totalPages={totalPages}
                columns={referralColumns}
                EmptyStateImage={EmptyStateImage}
                EmptyStateDescription={
                  <div className="text-center flex flex-col items-center gap-3">
                    <h2 className="text-2xl font-semibold">No Referrals Yet</h2>
                    <p className="text-[#A3B8B9] max-w-[400px]">
                      You haven't referred anyone yet. Start sharing your
                      referral link to invite friends and earn rewards!
                    </p>
                    <Button
                      type="submit"
                      className="w-1/2 bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-7"
                    >
                      Share Referral Link
                    </Button>
                  </div>
                }
                button={
                  <Button className="bg-[#002129] hover:bg-[#007F93] text-white flex items-center gap-2">
                    <ListFilter />
                    Filters
                  </Button>
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
                        : data.map((ref) => (
                            <ReferralCardData
                              key={ref.id}
                              ref={ref}
                              button={
                                <ReferralInfoSheet
                                  referral={ref}
                                  trigger={
                                    <button
                                      className="w-full py-5 bg-yellow-500 text-white text-xl font-semibold rounded-md hover:bg-yellow-600 transition cursor-pointer"
                                      type="button"
                                    >
                                      View Info
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
