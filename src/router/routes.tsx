import type { RouteObject } from "react-router";
import Home from "../pages/Home.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];
