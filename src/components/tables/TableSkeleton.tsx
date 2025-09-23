import React from "react";

export const TableSkeleton = () => {
  return (
    <div>
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
    </div>
  );
};
