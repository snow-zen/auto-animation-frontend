import { CheckCircle, CircleOff, ClipboardPenLine, Loader, Timer } from "lucide-react"

const taskTypeLabel = "task.type"
const supportLabels = [taskTypeLabel]

/**
 * 需要展示的标签。
 * @param record 标签字典。
 */
export function needShowLabel(record: Record<string, string>) {
  const result: string[] = []
  for (const [key, value] of Object.entries(record)) {
    if (supportLabels.includes(key)) {
      result.push(value)
    }
  }
  return result
}

/**
 * 任务状态列表。
 */
export const statuses = [
  {
    value: "DRAFT",
    label: "草稿",
    icon: ClipboardPenLine,
  },
  {
    value: "PREPARE",
    label: "准备",
    icon: Loader,
  },
  {
    value: "EXECUTING",
    label: "执行中",
    icon: Timer,
  },
  {
    value: "COMPLETED",
    label: "完成",
    icon: CheckCircle,
  },
  {
    value: "CANCEL",
    label: "取消",
    icon: CircleOff,
  },
]
