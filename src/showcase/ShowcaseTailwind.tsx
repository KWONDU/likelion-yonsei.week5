import CodeCompare from "./CodeCompare";

export default function ShowcaseTailwind() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Tailwind CSS</h2>
      <p className="text-gray-500 mb-8">기본 CSS → Tailwind 유틸리티 클래스</p>

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
        description="100줄 넘는 CSS가 한 줄로"
        before={{
          label: "BEFORE",
          filename: "index.css (100+ 줄)",
          code: `.header {
  background: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}
.product-card { ... }
.product-detail { ... }
.btn { ... }
/* ... 100줄 이상 */`,
        }}
        after={{
          label: "AFTER",
          filename: "index.css (1줄)",
          code: `@import "tailwindcss";`,
        }}
      />

      <CodeCompare
        title="Header 스타일링"
        before={{
          label: "BEFORE",
          filename: "Header.jsx",
          code: `<header className="header">
  <div className="header-logo">
    🛍️ Mini Mall
  </div>
  <nav className="header-nav">
    <button className={page === "home" ? "active" : ""}>
      홈
    </button>
  </nav>
</header>`,
        }}
        after={{
          label: "AFTER",
          filename: "Header.tsx",
          code: `<header className="bg-white shadow sticky top-0 z-10">
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
    </nav>
  </div>
</header>`,
        }}
      />

      <CodeCompare
        title="상품 카드"
        description="hover 시 이미지 확대 효과가 CSS 한 줄로"
        before={{
          label: "BEFORE",
          filename: "ProductCard.jsx",
          code: `<div className="product-card"
  onClick={() => onSelect(product.id)}>
  <img src={product.image} />
  <div className="product-card-info">
    <h3>{product.name}</h3>
    <p className="price">
      {product.price.toLocaleString()}원
    </p>
  </div>
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
    <h3 className="font-semibold">{product.name}</h3>
    <p className="text-blue-600 font-bold mt-1">
      {product.price.toLocaleString()}원
    </p>
  </div>
</Link>`,
        }}
      />

      <CodeCompare
        title="반응형 그리드"
        description="화면 크기에 따라 1열 → 2열 → 3열"
        before={{
          label: "BEFORE",
          filename: "index.css",
          code: `.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
/* 반응형? @media 쿼리 여러 개 추가해야... */`,
        }}
        after={{
          label: "AFTER",
          filename: "Products.tsx (인라인)",
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
    </div>
  );
}
