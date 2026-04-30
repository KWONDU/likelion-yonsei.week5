import { Outlet, Link, useLocation } from "react-router-dom";

const tabs = [
  { path: "/showcase/typescript", label: "TypeScript" },
  { path: "/showcase/tailwind", label: "Tailwind" },
  { path: "/showcase/router", label: "Router" },
  { path: "/showcase/context", label: "Context" },
];

export default function ShowcaseLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/showcase" className="font-bold text-gray-900">
            ← 5주차 데모
          </Link>
          <nav className="flex gap-1">
            {tabs.map((t) => (
              <Link
                key={t.path}
                to={t.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  pathname === t.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/shop"
            className="text-sm text-blue-600 hover:underline"
          >
            🛒 라이브 데모
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
