import axios from "axios";
import qs from "qs";
import {autoAnimationUrl} from "~/lib/api/config";
import {type Page, type Pagination, type Task} from "~/lib/schema";

export interface TasksPageFilter {
  title?: string,
  status?: string[]
}

export async function tasksPage(pageProps: Pagination, pageFilter: TasksPageFilter): Promise<Page<Task> | undefined> {
  try {
    const resp = await axios.get<Page<Task>>(
      '/tasks/page',
      {
        params: {
          pageIndex: pageProps.pageIndex,
          pageSize: pageProps.pageSize,
          title: pageFilter.title,
          status: pageFilter.status
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            arrayFormat: "comma"
          })
        },
        baseURL: autoAnimationUrl
      })
    return resp.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTask(taskId: number) {
  try {
    await axios.delete<void>(
      '/tasks/' + taskId,
      {
        baseURL: autoAnimationUrl
      }
    )
  } catch (error) {
    console.error(error)
  }
}