import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketingStore } from "@/store/marketing-store";
import ClicksIcon from "../../../assets/clicks.svg";
import { PerformanceChart } from "./PerformanceChart";

type MarketingStatsProps = {
  isLoading?: boolean;
};

const MarketingStats = ({ isLoading }: MarketingStatsProps) => {
  const stats = useMarketingStore((state) => state.stats);

  const chartData = stats.performance.map((d) => ({
    day: d.day,
    total: d.value, // rename value → total
  }));

  return (
    <>
      <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Rewards Earned */}
        <Card className="w-full min-h-[120px] bg-[#00191F] border-none">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Skeleton className="w-32 h-12 mb-2 rounded bg-gray-700" />
              <Skeleton className="w-40 h-8 rounded bg-gray-700" />
            </div>
          ) : (
            <>
              <CardHeader className="text-white text-sm sm:text-md pt-2 pb-1 px-0 font-normal">
                Total Rewards Earned
              </CardHeader>
              <CardContent className="flex flex-wrap items-center px-0 pb-2 pt-1">
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#233B40] mr-1">
                  {stats.currency}
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-cyan-50 truncate">
                  {stats.rewardsEarned.toLocaleString()}
                </span>
              </CardContent>
            </>
          )}
        </Card>

        {/* Total Signups */}
        <div className="w-full">
          <p className="text-white text-sm sm:text-md mb-2 font-normal">
            Total Signups
          </p>
          <Card className="w-full min-h-[120px] flex flex-col justify-center">
            {isLoading ? (
              <div className="flex justify-center items-center h-full gap-3">
                <Skeleton className="w-14 h-14 rounded bg-gray-700" />
                <Skeleton className="w-16 h-14 rounded bg-gray-700" />
              </div>
            ) : (
              <CardContent className="flex items-center flex-wrap gap-2 px-3 pb-2 pt-1">
                <div className="flex items-center mr-3 flex-shrink-0 overflow-hidden">
                  {stats.signupImages.map((img, idx) => (
                    <img
                      key={img}
                      src={img}
                      alt={`Signup ${idx + 1}`}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-md object-cover border-2 border-[#022328]"
                      style={{
                        marginLeft: idx === 0 ? 0 : -16,
                        zIndex: stats.signupImages.length - idx,
                      }}
                    />
                  ))}
                </div>
                <span className="text-2xl sm:text-4xl md:text-5xl font-semibold text-cyan-50 truncate">
                  {stats.totalSignups}
                </span>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Referral Clicks */}
        <div className="w-full">
          <p className="text-white text-sm sm:text-md mb-2 font-normal">
            Referral Clicks
          </p>
          <Card className="w-full min-h-[120px] flex flex-col justify-center">
            {isLoading ? (
              <div className="flex justify-center items-center h-full gap-3">
                <Skeleton className="w-10 h-10 rounded bg-gray-700" />
                <Skeleton className="w-24 h-14 rounded bg-gray-700" />
              </div>
            ) : (
              <CardContent className="flex items-center flex-wrap gap-4 px-3 pb-2 pt-1">
                <img
                  src={ClicksIcon}
                  className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                />
                <p className="text-2xl sm:text-4xl md:text-5xl font-semibold text-cyan-50 truncate">
                  {stats.clicks}
                  <span className="ml-1 sm:ml-2 text-2xl sm:text-4xl md:text-5xl font-semibold">
                    clicks
                  </span>
                </p>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Performance */}
        <div className="w-full">
          <p className="text-white text-sm sm:text-md mb-2 font-normal">
            Performance
          </p>
          <Card className="w-full min-h-[120px] flex flex-col justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center gap-1 sm:gap-2 h-full">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-4 h-8 sm:w-6 sm:h-10 rounded bg-gray-700"
                  />
                ))}
              </div>
            ) : (
              <CardContent className="flex flex-col justify-center h-20 w-full p-0">
                <PerformanceChart chartData={chartData} />
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default MarketingStats;
