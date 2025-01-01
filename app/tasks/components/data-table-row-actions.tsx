import type {Row} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import type {Task} from "~/lib/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  removeFn: (id: number) => void
}

export function DataTableRowActions<TData>({row, removeFn}: DataTableRowActionsProps<TData>) {
  const task = row.original as Task;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal/>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>编辑</DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          onClick={() => {
            removeFn(task.id)
          }}
        >删除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}