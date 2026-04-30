import CodeCompare from "./CodeCompare";

export default function ShowcaseTailwind() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Tailwind CSS</h2>
      <p className="text-gray-500 mb-8">인라인 스타일 → Tailwind 유틸리티 클래스</p>

      <CodeCompare
        title="설치 및 설정"
        before={{
          label: "BEFORE",
          filename: "vite.config.js",
          code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`,
        }}
        after={{
          label: "AFTER",
          filename: "vite.config.ts",
          code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
        }}
      />

      <CodeCompare
        title="CSS 파일"
        description="인라인 스타일에서 해방 — CSS 파일 자체가 한 줄로"
        before={{
          label: "BEFORE",
          filename: "index.css (3줄 reset만)",
          code: `/* 최소한의 CSS — Tailwind 도입 전 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

/* 나머지는 전부 인라인 스타일...
   style={{ padding: 12, border: "1px solid #ccc" }}
   이런 게 모든 컴포넌트에 */`,
        }}
        after={{
          label: "AFTER",
          filename: "index.css (1줄)",
          code: `@import "tailwindcss";

/* 인라인 스타일 전부 삭제
   className="p-3 border border-gray-300"
   이렇게 교체 */`,
        }}
      />

      <CodeCompare
        title="Header"
        description="인라인 style 객체 → Tailwind 클래스"
        before={{
          label: "BEFORE",
          filename: "Header.jsx",
          code: `<div
  style={{
    background: "#eee",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  }}
>
  <b onClick={() => onNavigate("home")}>
    Mini Mall
  </b>
  <div style={{ display: "flex", gap: 12 }}>
    <button onClick={() => onNavigate("home")}>
      홈
    </button>
    <button onClick={() => onNavigate("cart")}>
      장바구니 ({cart.length})
    </button>
  </div>
</div>`,
        }}
        after={{
          label: "AFTER",
          filename: "Header.tsx",
          code: `<header className="bg-white shadow
  sticky top-0 z-10">
  <div className="max-w-5xl mx-auto px-4 py-4
    flex items-center justify-between">
    <Link to="/"
      className="text-xl font-bold text-gray-900">
      🛍️ Mini Mall
    </Link>
    <nav className="flex items-center gap-6">
      <Link to="/products"
        className="text-gray-600
          hover:text-gray-900 transition">
        상품
      </Link>
      <Link to="/cart" className="relative ...">
        🛒 장바구니
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-4
            bg-red-500 text-white text-xs
            w-5 h-5 rounded-full ...">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  </div>
</header>`,
        }}
      />

      <CodeCompare
        title="상품 카드"
        description="border만 있던 카드 → 그림자 + 호버 확대 효과"
        before={{
          label: "BEFORE",
          filename: "ProductCard.jsx",
          code: `<div
  onClick={() => onSelect(product.id)}
  style={{
    border: "1px solid #ccc",
    padding: 12,
    cursor: "pointer",
  }}
>
  <img
    src={product.image}
    style={{
      width: "100%",
      height: 150,
      objectFit: "cover",
    }}
  />
  <p><b>{product.name}</b></p>
  <p>{product.price.toLocaleString()}원</p>
</div>`,
        }}
        after={{
          label: "AFTER",
          filename: "ProductCard.tsx",
          code: `<Link to={\`/products/\${product.id}\`}
  className="bg-white rounded-lg shadow
    hover:shadow-lg transition
    overflow-hidden group">
  <div className="overflow-hidden">
    <img src={product.image}
      className="w-full h-52 object-cover
        group-hover:scale-105
        transition duration-300" />
  </div>
  <div className="p-4">
    <h3 className="font-semibold">
      {product.name}
    </h3>
    <p className="text-blue-600 font-bold mt-1">
      {product.price.toLocaleString()}원
    </p>
  </div>
</Link>`,
        }}
      />

      <CodeCompare
        title="상품 그리드"
        description="고정 3열 → 반응형 1→2→3열"
        before={{
          label: "BEFORE",
          filename: "Products.jsx",
          code: `<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginTop: 16,
  }}
>
  {products.map(p =>
    <ProductCard key={p.id} ... />
  )}
</div>

// 모바일에서도 무조건 3열 → 깨짐`,
        }}
        after={{
          label: "AFTER",
          filename: "Products.tsx",
          code: `<div className="grid grid-cols-1
  sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(p =>
    <ProductCard key={p.id} product={p} />
  )}
</div>

// 모바일 → 1열
// ≥640px → 2열
// ≥1024px → 3열`,
        }}
      />

      <CodeCompare
        title="장바구니 담기 버튼"
        description="인라인 조건부 스타일 → Tailwind 조건부 클래스"
        before={{
          label: "BEFORE",
          filename: "ProductDetail.jsx",
          code: `<button
  onClick={handleAddToCart}
  style={{
    padding: "10px 20px",
    background: added ? "green" : "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
>
  {added ? "✓ 담았습니다!" : "장바구니 담기"}
</button>`,
        }}
        after={{
          label: "AFTER",
          filename: "ProductDetail.tsx",
          code: `<button
  onClick={handleAddToCart}
  className={\`px-6 py-3 rounded-lg
    text-white font-semibold transition
    \${added
      ? "bg-green-500"
      : "bg-blue-600 hover:bg-blue-700"
    }\`}
>
  {added ? "✓ 담았습니다!" : "🛒 장바구니 담기"}
</button>`,
        }}
      />
    </div>
  );
}
