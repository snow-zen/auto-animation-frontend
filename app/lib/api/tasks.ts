import axios from "axios"
import qs from "qs"

import { autoAnimationUrl } from "~/lib/api/config"
import { type Page, type Pagination, type Task } from "~/lib/schema"

/**
 * Task 分页过滤条件。
 */
export interface TasksPageFilter {
  /**
   * 标题
   */
  title?: string
  /**
   * 状态，可多选
   */
  status?: string[]
}

/**
 * 任务分页查询。
 * @param pageProps 分页参数。
 * @param pageFilter 过滤条件。
 */
export async function tasksPage(pageProps: Pagination, pageFilter: TasksPageFilter): Promise<Page<Task> | undefined> {
  try {
    const resp = await axios.get<Page<Task>>("/tasks/page", {
      params: {
        pageIndex: pageProps.pageIndex,
        pageSize: pageProps.pageSize,
        title: pageFilter.title,
        status: pageFilter.status,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: "comma",
        })
      },
      baseURL: autoAnimationUrl,
    })
    return resp.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 删除任务。
 * @param taskId 任务 id。
 */
export async function deleteTask(taskId: number) {
  try {
    await axios.delete<void>("/tasks/" + taskId, {
      baseURL: autoAnimationUrl,
    })
  } catch (error) {
    console.error(error)
  }
}
