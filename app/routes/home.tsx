import TaskPage from "~/tasks/page/page"

export function meta() {
  return [{ title: "Auto-animation" }, { name: "description", content: "auto-animation project" }]
}

export default function Home() {
  return <TaskPage />
}
