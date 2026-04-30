import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg mb-4">장바구니가 비어있습니다.</p>
        <Link
          to="/shop/products"
          className="text-blue-600 hover:underline"
        >
          상품 보러가기 →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">장바구니</h2>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-blue-600 font-bold">
                {item.price.toLocaleString()}원
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6 flex items-center justify-between">
        <span className="text-lg text-gray-600">
          총 {cart.length}개 상품
        </span>
        <span className="text-2xl font-bold text-gray-900">
          {total.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
