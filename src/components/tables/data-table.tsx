import { JSX, useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useDebounce } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  header?: JSX.Element;
  button?: JSX.Element;
  externalTabs?: JSX.Element;
  hideTableBody?: boolean;
  customContent?: JSX.Element;

  page: number;
  limit: number;
  query: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onQueryChange: (query: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  // searchKey,
  header,
  button,
  externalTabs,
  hideTableBody,
  customContent,
  page,
  limit,
  query,
  onPageChange,
  onLimitChange,
  onQueryChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery);

  // 🔄 Sync debounced value to parent
  useEffect(() => {
    if (debouncedQuery !== query) {
      onQueryChange(debouncedQuery);
    }
  }, [debouncedQuery]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      //   columnVisibility,
      //   rowSelection,
    },
  });

  return (
    <>
      <div className="mx-auto mb-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl md:text-[31px] font-semibold text-white">
              {header}
            </div>
            <div>{externalTabs}</div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="ml-auto flex items-center gap-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute top-3 left-3 text-white" />
                <Input
                  placeholder="Search"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  className="placeholder:text-white placeholder-opacity-100 max-w-lg w-lg pl-9 h-10 focus-visible:border-none border-[#002129] bg-[#002129] text-white"
                />
              </div>

              {button}
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      {hideTableBody ? (
        <div>{customContent}</div>
      ) : (
        <div>
          {/* border */}
          <Table>
            <TableHeader className="border-t border-[#E8FFFD33]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="[&:has([role=checkbox])]:pl-3 bg-baseColor/90 text-vmcwhite font-normal text-base capitalize pt-8 pb-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="[&:has([role=checkbox])]:pl-3 text-[15px] py-[22px] font-normal"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-20 text-center font-semibold text-[15px]"
                  >
                    No data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination + Page Size */}
      <div className="flex items-center justify-between pt-5">
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="page-size" className="font-medium">
            Show:
          </label>
          <select
            id="page-size"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="bg-[#002129] text-white rounded px-2 py-1"
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>Page {page}</span>
          <Button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="bg-[#007F93] hover:bg-[#1892a5] text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </Button>
          <button
            onClick={() => onPageChange(page + 1)}
            className="bg-[#007F93] hover:bg-[#1892a5] text-white px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center text-lg font-semibold mt-8">
          {query ? "No results match your search." : "No referrals yet."}
        </div>
      )}
    </>
  );
}
