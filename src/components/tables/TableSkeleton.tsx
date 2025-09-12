import { Plus, Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface TableSkeletonProps {
  setOpenAddUser: (open: boolean) => void;
  view: "table" | "card";
  setView: (view: "table" | "card") => void;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  setOpenAddUser,
  view,
  setView,
}) => {
  return (
    <div>
      <div className="mx-auto mb-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white font-header">
              My Referrals
            </h1>
            <div>
              {/* Add the tabs to the skeleton */}
              <Tabs
                value={view}
                onValueChange={(val) => setView(val as "table" | "card")}
              >
                <TabsList className="mt-3 bg-transparent gap-3">
                  <TabsTrigger value="table">
                    <div className="flex items-center gap-2">
                      {/* Use skeleton instead of actual image */}
                      <div className="h-4 w-4 bg-[#E6E6E626] rounded"></div>
                      <div className="h-4 w-16 bg-[#E6E6E626] rounded"></div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="card">
                    <div className="flex items-center gap-2">
                      {/* Use skeleton instead of actual image */}
                      <div className="h-4 w-4 bg-[#E6E6E626] rounded"></div>
                      <div className="h-4 w-16 bg-[#E6E6E626] rounded"></div>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="ml-auto flex items-center gap-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute top-3 left-3 text-white" />
                <Input
                  placeholder="Search"
                  className="placeholder:text-white placeholder-opacity-100 max-w-lg w-lg pl-9 h-10 focus-visible:border-none border-[#002129] bg-[#002129] text-white"
                />
              </div>

              <Button
                className="bg-[#007F93] hover:bg-[#1892a5] text-white flex items-center gap-2"
                onClick={() => setOpenAddUser(true)}
                disabled
              >
                <Plus />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Conditionally show table or card skeleton based on view state */}
      {view === "table" ? (
        <div className="w-full bg-[#00191F] rounded-md overflow-hidden border border-[#E8FFFD33]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8FFFD33] ">
                {/* Simulated header skeletons */}
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[17px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[108px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[42px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[59px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[65px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[85px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="h-[12.8px] w-[55px] rounded bg-[#E6E6E626] mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-[#E8FFFD33]">
                  {/* First cell: icon skeleton */}
                  <td className="p-2 text-center">
                    <div className="h-[12.8px] w-[47px] bg-[#E6E6E626] rounded mx-auto"></div>
                  </td>
                  {/* Second cell: short skeleton */}
                  <td className="p-2 text-center">
                    <div className="h-[44px] w-[45px] bg-[#E6E6E626] mx-auto"></div>
                  </td>
                  {/* Third cell: medium skeleton */}
                  <td className="p-2 text-center">
                    <div className="h-[12.8px] w-[113px] bg-[#E6E6E626] rounded mx-auto"></div>
                  </td>
                  {/* Fourth cell: orange pills */}
                  <td className="p-2 text-center">
                    <div className="flex justify-center items-center gap-1">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <React.Fragment key={j}>
                          <div
                            className="h-[20px] w-[23px] bg-yellow-500 rounded-sm"
                            style={{ opacity: 0.9 }}
                          />
                          {/* Insert gray box *after* each yellow pill except the last one */}
                          {j < 3 && (
                            <div className="h-[9px] w-[4px] bg-[#E6E6E626] rounded-sm"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                  {/* Fifth cell: long skeletons */}
                  <td className="p-2 text-center">
                    <div className="flex justify-center items-center">
                      {/* Bigger red box */}
                      <div className="h-[44px] w-[20px] bg-[#E6E6E626]"></div>
                      {/* Smaller green box */}
                      <div className="h-[44px] w-[15px] bg-[#3F5155]"></div>{" "}
                      <div className="h-[44px] w-[8px] bg-[#E6E6E626]"></div>{" "}
                      <div className="h-[44px] w-[15px] bg-[#3F5155]"></div>{" "}
                      <div className="h-[44px] w-[20px] bg-[#E6E6E626]"></div>
                    </div>
                  </td>

                  {/* Sixth cell: medium skeleton */}
                  <td className="p-2 text-center">
                    <div className="h-[12.8px] w-[113px] bg-[#E6E6E626] rounded mx-auto"></div>
                  </td>

                  {/* Seventh cell: medium skeleton */}
                  <td className="p-2 text-center">
                    <div className="h-[12.8px] w-[113px] bg-[#E6E6E626] rounded mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Card view skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border p-4 bg-[#00191F] border-[#E8FFFD33]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E6E6E626]"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-[#E6E6E626] rounded"></div>
                    <div className="h-3 w-24 bg-[#E6E6E626] rounded"></div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-40 bg-[#E6E6E626] rounded"></div>
                  <div className="h-3 w-36 bg-[#E6E6E626] rounded"></div>
                </div>
                <div className="h-9 w-24 bg-[#E6E6E626] rounded mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
