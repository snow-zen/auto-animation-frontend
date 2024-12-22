import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff, ClipboardPenLine,
  HelpCircle,
  Timer,
} from "lucide-react"

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
    value: "draft",
    label: "草稿",
    icon: ClipboardPenLine,
  },
  {
    value: "in progress",
    label: "执行中",
    icon: Timer,
  },
  {
    value: "done",
    label: "完成",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "取消",
    icon: CircleOff,
  },
]