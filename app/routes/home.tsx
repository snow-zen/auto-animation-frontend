import type {Route} from "./+types/home";
import TaskPage from "~/tasks/page"

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Auto-animation"},
    {name: "description", content: "auto-animation project"},
  ];
}

export default function Home() {
  return <TaskPage/>;
}
