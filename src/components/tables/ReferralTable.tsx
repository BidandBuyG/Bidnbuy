/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import TableIcon from "../../assets/table-tab-icon.svg";
import CardIcon from "../../assets/card-tab-icon.svg";
import ReferralInfoSheet from "../referrals/ReferralInfoSheet";
import { AddReferralSheet } from "../referrals/AddUserSheet";
import { TableSkeleton } from "./TableSkeleton";
import ReferralCardData from "./ReferralCardData";
import { ReferralErrorState } from "../referrals/ErrorTableData";
import { ReferralEmptyState } from "../referrals/EmptyPlaceholder";

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
  limit,
  query,
  onPageChange,
  onLimitChange,
  onQueryChange,
}: Props) => {
  const [view, setView] = useState<"table" | "card">("table");
  const [openAddUser, setOpenAddUser] = useState(false);

  return (
    <>
      <section aria-labelledby="task-title" className="text-white">
        <div className="mt-4 md:mt-7">
          <div className="mt-8">
            {isLoading && (
              <TableSkeleton
                setOpenAddUser={setOpenAddUser}
                view={view}
                setView={setView}
              />
            )}

            {!isLoading && isError && (
              <ReferralErrorState
                setOpenAddUser={setOpenAddUser}
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
                      header="My Referrals"
                      columns={referralColumns}
                      searchKey="category"
                      button={
                        <Button
                          className="bg-[#007F93] hover:bg-[#1892a5] text-white flex items-center gap-2"
                          onClick={() => setOpenAddUser(true)}
                        >
                          <Plus />
                          Add User
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
                            {data.map((ref) => (
                              <div key={ref.id} className="">
                                <ReferralCardData
                                  ref={ref}
                                  button={
                                    <ReferralInfoSheet
                                      referral={ref}
                                      trigger={
                                        <button
                                          className="w-full py-5 bg-yellow-500 text-white text-xl font-semibold rounded-md hover:bg-yellow-600 transition"
                                          type="button"
                                        >
                                          View Info
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
                  <ReferralEmptyState
                    setOpenAddUser={setOpenAddUser}
                    view={view}
                    setView={setView}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <AddReferralSheet open={openAddUser} onOpenChange={setOpenAddUser} />
      </section>
    </>
  );
};
