import { Outlet } from "react-router";

export default function AuthorizationPagesLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-gray-200 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-center font-bold text-2xl text-gray-800">REACT TASK</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
