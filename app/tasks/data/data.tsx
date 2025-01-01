import {CheckCircle, CircleOff, ClipboardPenLine, Loader, Timer} from "lucide-react"

export const labels = [
  {
    value: "Movie",
    label: "电影",
  },
  {
    value: "TV",
    label: "TV",
  },
]

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
    icon: CircleOff
  }
]