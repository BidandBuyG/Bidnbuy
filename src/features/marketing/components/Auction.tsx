/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getValidLimit, getValidPage } from "@/lib/utils";
import { MarketingDashboardLayout } from "@/components/layout/MarketingDashboardLayout";
import { BottomSectionLinks } from "@/components/layout/BottomSectionLinks";
import { AuctionColumn } from "@/components/columns/AuctionColumn";
import { AuctionTable } from "@/components/tables/AuctionTable";
import AuctionImg from "../../../assets/auction-img.png";

const dummyData = [
  {
    id: "1",
    productImg: AuctionImg,
    productName: "Ethereal Blossoms",
    sellerName: "Amelia Grant",
    startDate: "12/23/2025",
    timeLeft: "2d 4h 20m",
    initialBid: 5000,
    highestBid: 12000,
    intestedBidders: [
      {
        id: "1",
        name: "Sarah Walter",
        date: "12/23/2025",
        amount: "N28,000",
        avatar:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=64&h=64&facepad=2",
      },
      {
        id: "2",
        name: "Sarah Walter",
        date: "12/23/2025",
        amount: "N28,000",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&facepad=2",
      },
      {
        id: "3",
        name: "Sarah Walter",
        date: "12/23/2025",
        amount: "N28,000",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=64&h=64&facepad=2",
      },
    ],
  },
];

export default function Auction() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(dummyData);

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
      let filtered = dummyData;
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter((r) =>
          [r.productName, r.sellerName].some(
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
    <div className="mt-[5em]">
      <AuctionTable
        data={data}
        auctionColumns={AuctionColumn}
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
  );
}
