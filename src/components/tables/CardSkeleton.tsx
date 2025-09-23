export const CardSkeleton = () => {
  return (
    <div className="w-full py-5 bg-[#00191F] rounded-md shadow border border-[#E8FFFD33] animate-pulse">
      <div className="h-6 w-2/3 bg-[#E6E6E626] rounded mb-4 mx-auto"></div>
      <div className="h-4 w-1/2 bg-[#E6E6E626] rounded mb-6 mx-auto"></div>
      <div className="h-10 w-3/4 bg-[#E6E6E626] rounded mx-auto"></div>
    </div>
  );
};
