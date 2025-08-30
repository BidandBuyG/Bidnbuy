type LoadingGridProps = {
  count?: number;
  height?: string;
  className?: string;
};

const LoadingGrid = ({ count = 8, height = "h-64", className = "" }: LoadingGridProps) => {
  return (
    <Skeleton></Skeleton>
    <div className={`py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`animate-pulse bg-[#00222E] rounded-lg p-4 ${height}`} />
      ))}
    </div>

    <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <Skeleton className="h-10 flex-1 bg-teal-800/50" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-20 bg-teal-800/50" />
                      <Skeleton className="h-10 w-20 bg-teal-800/50" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-12 bg-teal-800/50" />
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full bg-teal-800/50" />
                    ))}
                  </div>
                </div>
  );
};

export default LoadingGrid;
