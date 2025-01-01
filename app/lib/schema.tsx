export interface Pagination {
  pageIndex: number,
  pageSize: number
}

export interface Page<T> {
  pageIndex: number,
  data: T[],
  count: number
}

export interface Task {
  id: number,
  title: string,
  status: string,
  label?: string
}