import {
  type QueryClient,
  type UseMutationResult,
  keepPreviousData,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import React from "react"

import { Badge } from "~/components/ui/badge"
import { Checkbox } from "~/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { deleteTask, tasksPage } from "~/lib/api/tasks"
import type { Pagination, Task } from "~/lib/schema"
import { debounce } from "~/lib/utils"
import { DataTableColumnHeader } from "~/tasks/components/data-table-column-header"
import { DataTablePagination } from "~/tasks/components/data-table-pagination"
import { DataTableRowActions } from "~/tasks/components/data-table-row-actions"
import { needShowLabel, statuses } from "~/tasks/data/data"

import { DataTableToolbar } from "./data-table-toolbar"

interface DataTableProps {
  queryClient: QueryClient
}

export function DataTable({ queryClient }: DataTableProps) {
  // 创建相关状态
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = debounce(React.useState<ColumnFiltersState>([]), 1000)

  // 定义查询
  const queryKey = ["data", pagination, columnFilters]
  const dataQuery = useQuery({
    queryKey,
    queryFn: () => {
      const titleFilter = columnFilters.find((it) => it.id === "title")
      const statusFilter = columnFilters.find((it) => it.id === "status")
      return tasksPage(pagination, {
        title: (titleFilter?.value as string) ?? "",
        status: (statusFilter?.value as string[]) ?? [],
      })
    },
    placeholderData: keepPreviousData,
  })

  // 删除 Hook
  const removeTaskMutation = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const columns = getColumnDef(removeTaskMutation)
  const table = useReactTable({
    data: dataQuery.data?.data ?? [],
    columns: columns,
    rowCount: dataQuery.data?.count ?? 0,
    state: {
      pagination,
      columnFilters,
      sorting,
      rowSelection,
    },
    manualPagination: true,
    manualFiltering: true,
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "select"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  无数据。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

/**
 * 任务列定义。
 * @param removeTaskMutation 删除任务回调。
 */
function getColumnDef(removeTaskMutation: UseMutationResult<void, Error, number, unknown>): ColumnDef<Task>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="任务 ID" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="标题" />,
      cell: ({ row }) => {
        const label = needShowLabel(row.original.labels)
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue("title")}</span>
            {label.map((item) => {
              return <Badge variant="outline">{item}</Badge>
            })}
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="状态" />,
      cell: ({ row }) => {
        const status = statuses.find((status) => status.value === row.getValue("status"))

        if (!status) {
          return null
        }

        return (
          <div className="flex w-[100px] items-center">
            {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>{status.label}</span>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="操作" />,
      cell: ({ row }) => <DataTableRowActions row={row} removeFn={removeTaskMutation.mutate} />,
    },
  ]
}
