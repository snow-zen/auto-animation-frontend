/**
 * 分页参数说明。
 */
export interface Pagination {
  /**
   * 页码。
   */
  pageIndex: number
  /**
   * 页大小。
   */
  pageSize: number
}

/**
 * 分页结果。
 */
export interface Page<T> {
  /**
   * 页码。
   */
  pageIndex: number
  /**
   * 页数据。
   */
  data: T[]
  /**
   * 总数据量。
   */
  count: number
}

/**
 * 任务结构。
 */
export interface Task {
  /**
   * 任务 id。
   */
  id: number
  /**
   * 任务标题。
   */
  title: string
  /**
   * 任务状态。
   */
  status: string
  /**
   * 任务标签。
   */
  labels: Record<string, string>
}
