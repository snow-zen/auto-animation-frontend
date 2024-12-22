import type {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "~/components/ui/checkbox";
import type {Task} from "~/tasks/data/schema";
import {DataTableColumnHeader} from "~/tasks/components/data-table-column-header";
import {DataTableRowActions} from "~/tasks/components/data-table-row-actions";
import {labels, statuses} from "~/tasks/data/data";
import {Badge} from "~/components/ui/badge";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all"
        className="translate-y-[2px]"/>
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row"
        className="translate-y-[2px]"/>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="任务 ID"/>
    ),
    cell: ({row}) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="标题"/>
    ),
    cell: ({row}) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="状态"/>
    ),
    cell: ({row}) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
          )}
          <span>
            {status.label}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: "actions",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="操作"/>
    ),
    cell: ({row}) => <DataTableRowActions row={row}/>
  }
]