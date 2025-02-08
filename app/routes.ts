import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  ...prefix("tasks", [route("add", "./tasks/add/page.tsx")]),
] satisfies RouteConfig
