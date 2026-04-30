import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">상품을 찾을 수 없습니다.</p>
        <Link to="/shop/products" className="text-blue-600 hover:underline mt-4 inline-block">
          상품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-80 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h2>
        <p className="text-2xl text-blue-600 font-bold mb-4">
          {product.price.toLocaleString()}원
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>
        <button
          onClick={handleAddToCart}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
            added
              ? "bg-green-500"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {added ? "✓ 담았습니다!" : "🛒 장바구니 담기"}
        </button>
      </div>
    </div>
  );
}
