import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white text-center py-1.5 text-xs">
        ✅ AFTER — TypeScript · Tailwind · React Router · Context API
        {" · "}
        <Link to="/starter" className="underline">Before 버전 보기</Link>
        {" · "}
        <Link to="/showcase" className="underline">코드 비교 보기</Link>
      </div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
