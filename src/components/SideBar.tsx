import { NavLink } from "react-router";
import { sidebarRoutes } from "../constants/sidebarRoutes";

export default function SideBar() {
  return (
    <aside className="sticky top-0 left-0 flex h-screen w-[150px] border-gray-200 border-r bg-white pt-[95px] shadow-md">
      <nav className="w-full">
        <ul className="flex flex-col items-center gap-2 p-2">
          {sidebarRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <li key={route.path} className="w-full">
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `flex w-full flex-row items-center justify-start gap-3 rounded-lg p-3 transition-colors duration-200 ${
                      isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  title={route.label}
                >
                  <Icon className="text-2xl" />
                  <span className="text-nowrap text-start font-medium text-xs leading-tight">
                    {route.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
