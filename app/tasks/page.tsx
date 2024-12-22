import {z} from "zod"

import {DataTable} from "~/tasks/components/data-table";
import {columns} from "~/tasks/components/columns";

import {taskSchema} from "~/tasks/data/schema";

function getTasks() {
  const data = [
    {
      "id": "TASK-8782",
      "title": "我心里危险的东西",
      "status": "in progress",
      "label": "TV"
    },
    {
      "id": "TASK-8783",
      "title": "胆大党",
      "status": "done",
      "label": "TV"
    }
  ]
  // const tasks = JSON.parse(data.toString())
  return z.array(taskSchema).parse(data)
}

export default function TaskPage() {
  const tasks = getTasks()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">任务列表</h2>
        </div>
      </div>
      <DataTable columns={columns} data={tasks}/>
    </div>
  )
}