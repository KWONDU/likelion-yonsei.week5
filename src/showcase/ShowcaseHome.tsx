import { Link } from "react-router-dom";

const sections = [
  { path: "/showcase/typescript", emoji: "🔷", title: "TypeScript", desc: ".jsx → .tsx 변환, interface, props 타입, useState 제네릭" },
  { path: "/showcase/tailwind", emoji: "🎨", title: "Tailwind CSS", desc: "기본 CSS → 유틸리티 클래스, 반응형, hover 효과" },
  { path: "/showcase/router", emoji: "🧭", title: "React Router DOM", desc: "useState 탭 전환 → URL 기반 라우팅, Outlet, useParams" },
  { path: "/showcase/context", emoji: "🔗", title: "Context API", desc: "Props Drilling → Context Provider + useContext" },
];

export default function ShowcaseHome() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">5주차 세션 데모</h1>
      <p className="text-gray-500 text-lg mb-10">
        React (2) — TypeScript · Tailwind · Router · Context
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {sections.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition group"
          >
            <div className="text-3xl mb-3">{s.emoji}</div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
              {s.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
            <span className="text-blue-600 text-sm mt-3 inline-block">
              Before / After 비교 →
            </span>
          </Link>
        ))}
      </div>

      <Link
        to="/shop"
        className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl text-lg font-semibold transition"
      >
        🛒 완성된 쇼핑몰 데모 보기 →
      </Link>
    </div>
  );
}
