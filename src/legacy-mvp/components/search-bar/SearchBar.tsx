import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="px-4 py-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Find anything you are looking for"
          className="w-full bg-[#004755] text-white rounded-md py-2 pl-4 pr-10 text-sm placeholder-gray-300"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}
