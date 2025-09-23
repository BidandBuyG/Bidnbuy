/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import TableIcon from "../../assets/table-tab-icon.svg";
import CardIcon from "../../assets/card-tab-icon.svg";
import { AddUserSheet } from "../referrals/AddUserSheet";
import ReferralCardData from "./ReferralCardData";
import { TableErrorState } from "../referrals/ErrorTableData";
import { AddUserInfoSheet } from "../referrals/AddUserInfoSheet";
import EmptyStateImage from "../../assets/user-empty-data.png";
import { CardSkeleton } from "./CardSkeleton";

interface User {
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
  data: User[];
  userColumns: any;
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

export const AddUserTable = ({
  data,
  userColumns,
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
  const [openAddUser, setOpenAddUser] = useState(false);

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
                      <span>Add</span>{" "}
                      <span className="text-[#748C8D]">User</span>
                    </h2>
                  </div>
                }
                setOpenAddUser={setOpenAddUser}
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
                      <span>Add</span>{" "}
                      <span className="text-[#748C8D]">User</span>
                    </h2>
                  </div>
                }
                EmptyStateImage={EmptyStateImage}
                EmptyStateDescription={
                  <div className="flex flex-col items-center text-center">
                    <h2 className="text-lg font-medium text-white">
                      This space looks empty! Add a user to
                      <br />
                      begin tracking bids, referrals, and
                      <br />
                      team performance
                    </h2>

                    <Button
                      type="submit"
                      className="w-1/2 bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-7"
                      onClick={() => setOpenAddUser(true)}
                    >
                      Add a User Now
                    </Button>
                  </div>
                }
                columns={userColumns}
                totalPages={totalPages}
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
                    onValueChange={(val) => setView(val as "table" | "card")}
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
                      {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <CardSkeleton key={i} />
                          ))
                        : data.map((ref) => (
                            <ReferralCardData
                              ref={ref}
                              key={ref.id}
                              button={
                                <AddUserInfoSheet
                                  user={ref}
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
        <AddUserSheet open={openAddUser} onOpenChange={setOpenAddUser} />
      </section>
    </>
  );
};
