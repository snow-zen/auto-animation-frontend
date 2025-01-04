import type { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { DataTableFacetedFilter } from "~/tasks/components/data-table-faceted-filter"
import { statuses } from "~/tasks/data/data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="过滤任务"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("title")?.setFilterValue(event.target.value)
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="状态" options={statuses} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            重置
            <X />
          </Button>
        )}
      </div>
      <Button variant="secondary" className="h-8 w-[70px] px-2 lg:px-3">
        添加
      </Button>
    </div>
  )
}
