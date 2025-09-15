/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReferralColumn } from "../../../components/columns/ReferralColumn";
import { ReferralTable } from "../../../components/tables/ReferralTable";
import User1 from "../../../assets/addUser.png";
import User2 from "../../../assets/photo.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getValidLimit, getValidPage } from "@/lib/utils";

const dummyReferrals = [
  {
    id: "4534",
    profileImg: User1,
    firstName: "Angela",
    lastName: "Balogun",
    gender: "Female",
    phone: "+23456787545",
    email: "Sarahbalogun@gmail.com",
    category: "Vendor",
  },
  {
    id: "4534",
    profileImg: User2,
    firstName: "David",
    lastName: "Balogun",
    gender: "Male",
    phone: "+23456787545",
    email: "Davidbalogun@gmail.com",
    category: "Vendor",
  },
];

export default function Referrals() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(dummyReferrals);

  const [searchParams, setSearchParams] = useSearchParams();

  // Defaults from URL or fallback
  const page = getValidPage(searchParams.get("page"));
  const limit = getValidLimit(searchParams.get("limit"));
  const query = searchParams.get("query") || "";

  // Simulate API call on param change
  useEffect(() => {
    setLoading(true);
    setError(false);

    // Pretend API filter
    setTimeout(() => {
      let filtered = dummyReferrals;
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
      setData(filtered);
      setLoading(false);
    }, 500);
  }, [page, limit, query]);

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
    <div
      style={{ padding: 24 }}
      className="bg-[#00191F] text-white min-h-screen "
    >
      <h1>Referrals (Engine)</h1>

      <div className="mt-[5em]">
        <ReferralTable
          data={data}
          referralColumns={ReferralColumn}
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
          onPageChange={(newPage) =>
            setSearchParams({
              page: String(newPage),
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
    </div>
  );
}
