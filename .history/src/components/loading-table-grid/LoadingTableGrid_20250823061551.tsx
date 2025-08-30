import { Skeleton } from "../ui/skeleton"

const LoadingTableGrid = () => {
  return (
    <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <Skeleton className="h-10 flex-1 bg-[#00222E]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-20 bg-[#00222E]" />
                      <Skeleton className="h-10 w-20 bg-[#00222E]" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-12 bg-[#00222E]" />
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full bg-[#00222E]" />
                    ))}
                  </div>
                </div>
  )
}

export default LoadingTableGrid