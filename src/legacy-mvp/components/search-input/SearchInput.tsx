import { Search } from "lucide-react"

type SearchInputProps = {
  placeholder?: string
  className?: string
}

export function SearchInput({ placeholder = "Search...", className = "" }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-[#095069] text-white rounded-md py-2.5 pl-4 pr-12 text-sm placeholder-gray-400"
      />
      <button className="absolute right-3 top-2.5">
        <Search className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  )
}
