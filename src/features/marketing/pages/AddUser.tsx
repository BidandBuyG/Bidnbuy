/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddUserColumn } from "../../../components/columns/AddUserColumn";
import { AddUserTable } from "@/components/tables/AddUserTable";
import User1 from "../../../assets/addUser.png";
import User2 from "../../../assets/photo.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getValidLimit, getValidPage } from "@/lib/utils";
import { MarketingDashboardLayout } from "@/components/layout/MarketingDashboardLayout";
import { BottomSectionLinks } from "@/components/layout/BottomSectionLinks";

const dummyUser = [
  {
    id: "234",
    profileImg: User1,
    firstName: "Angela",
    lastName: "Balogun",
    gender: "Female",
    phone: "+23456787545",
    email: "Sarahbalogun@gmail.com",
    category: "Vendor",
  },
  {
    id: "564",
    profileImg: User2,
    firstName: "David",
    lastName: "Balogun",
    gender: "Male",
    phone: "+23456787545",
    email: "Davidbalogun@gmail.com",
    category: "Vendor",
  },
];

export default function AddUser() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [allData] = useState(dummyUser); // keep the original untouched
  const [data, setData] = useState(allData); // filtered data
  const [filteredCount, setFilteredCount] = useState(allData.length);

  const [searchParams, setSearchParams] = useSearchParams();

  // Defaults from URL or fallback
  const page = getValidPage(searchParams.get("page"));
  const limit = getValidLimit(searchParams.get("limit"));
  const query = searchParams.get("query") || "";

  const [totalPages, setTotalPages] = useState(
    Math.max(1, Math.ceil(allData.length / limit))
  );

  // Simulate API call on param change
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(false);

    const timeout = setTimeout(() => {
      let filtered = allData;
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter((r) =>
          [
            r.firstName,
            r.lastName,
            r.email,
            r.phone,
            r.category,
            r.gender,
          ].some(
            (field) =>
              typeof field === "string" && field.toLowerCase().includes(q)
          )
        );
      }

      if (!isCancelled) {
        setData(filtered);
        setFilteredCount(filtered.length);

        const newTotalPages = Math.max(1, Math.ceil(filtered.length / limit));
        setTotalPages(newTotalPages);

        if (page > newTotalPages) {
          setSearchParams({
            page: String(newTotalPages),
            limit: String(limit),
            query,
          });
        }

        setLoading(false); // only after data update
      }
    }, 500);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [page, limit, query, allData]);

  useEffect(() => {
    // Only update if params were invalid
    if (
      String(page) !== searchParams.get("page") ||
      String(limit) !== searchParams.get("limit")
    ) {
      setSearchParams({
        page: String(page),
        limit: String(limit),
        query: query,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  return (
    <MarketingDashboardLayout>
      <div className="bg-[#00191F] text-white">
        <div className="mt-[5em]">
          <AddUserTable
            data={data}
            userColumns={AddUserColumn}
            isLoading={isLoading}
            onRetry={() => {
              setLoading(true);
              setSearchParams({
                page: String(page),
                limit: String(limit),
                query,
              });
            }}
            page={page}
            limit={limit}
            query={query}
            totalPages={totalPages}
            onPageChange={(newPage: number) =>
              setSearchParams({
                page: String(Math.max(1, Math.min(newPage, totalPages))),
                limit: String(limit),
                query,
              })
            }
            onLimitChange={(newLimit) =>
              setSearchParams({ page: "1", limit: String(newLimit), query })
            }
            onQueryChange={(newQuery) =>
              setSearchParams({
                page: "1",
                limit: String(limit),
                query: newQuery,
              })
            }
          />
        </div>
        <BottomSectionLinks />
      </div>
    </MarketingDashboardLayout>
  );
}
