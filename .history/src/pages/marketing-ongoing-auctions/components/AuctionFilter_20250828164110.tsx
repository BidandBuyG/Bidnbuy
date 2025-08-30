import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

type AuctionFilterProps = {
  onFilterChange: (filter: string) => void;
}

export function AuctionFilter({ onFilterChange }: AuctionFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "Ending Soon",
    "New Listings",
    "Popular",
    "Low Bids",
    "High Value",
  ];

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-slate-800 border-slate-700 text-white min-w-[150px]"
      >
        {filters.map((filter) => (
          <DropdownMenuItem
            key={filter}
            onClick={() => handleFilterSelect(filter)}
            className={`hover:bg-slate-700 cursor-pointer ${
              selectedFilter === filter ? "bg-slate-700 text-teal-400" : ""
            }`}
          >
            {filter}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
