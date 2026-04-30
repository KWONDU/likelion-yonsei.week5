import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Mini Shopping Mall
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        React + TypeScript + Tailwind + React Router + Context API
      </p>
      <Link
        to="/shop/products"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
      >
        상품 보러가기 →
      </Link>
    </div>
  );
}
