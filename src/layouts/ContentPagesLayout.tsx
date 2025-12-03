import { Outlet } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function ContentPagesLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="m-4 mx-auto max-w-7xl flex-1 rounded border border-gray-200 px-2 py-8 shadow-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
