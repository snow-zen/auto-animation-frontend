import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { DataTable } from "~/tasks/page/components/data-table"

export default function TaskPage() {
  const queryClient = new QueryClient()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">任务列表</h2>
        </div>
      </div>
      <QueryClientProvider client={queryClient}>
        <DataTable queryClient={queryClient} />
      </QueryClientProvider>
    </div>
  )
}
