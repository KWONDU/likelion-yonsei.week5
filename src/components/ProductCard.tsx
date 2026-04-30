import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/shop/products/${product.id}`}
      className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-blue-600 font-bold mt-1">
          {product.price.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}
