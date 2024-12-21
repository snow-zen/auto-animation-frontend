import type {Route} from "./+types/home";
import {Task} from "~/task/task"

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Auto-animation"},
    {name: "description", content: "auto-animation project"},
  ];
}

export default function Home() {
  return <Task/>;
}
