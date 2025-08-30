type LoadingGridProps = {
  count?: number;
  height?: string;
  className?: string;
};

const LoadingGrid = ({ count = 8, height = "h-64", className = "" }: LoadingGridProps) => {
  return (
    <Skeleton>


    <div className={`py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`animate-pulse bg-[#00222E] rounded-lg p-4 ${height}`} />
      ))}
    </div>
    </Skeleton>

  );
};

export default LoadingGrid;
