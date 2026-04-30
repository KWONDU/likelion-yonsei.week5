import CodeCompare from "./CodeCompare";
import NewFile from "./NewFile";

export default function ShowcaseRouter() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">React Router DOM</h2>
      <p className="text-gray-500 mb-8">useState 탭 전환 → URL 기반 페이지 전환</p>

      <CodeCompare
        title="main.tsx — BrowserRouter 감싸기"
        before={{
          label: "BEFORE",
          filename: "main.jsx",
          code: `import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
        }}
        after={{
          label: "AFTER",
          filename: "main.tsx",
          code: `import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);`,
        }}
      />

      <CodeCompare
        title="App — 페이지 전환 방식 변경"
        description="useState 조건부 렌더링 → Routes/Route 매칭"
        before={{
          label: "BEFORE",
          filename: "App.jsx (30줄+)",
          code: `export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <>
      <Header currentPage={currentPage}
        onNavigate={setCurrentPage} />
      <main>
        {currentPage === "home" && <Home />}
        {currentPage === "products" && <Products />}
        {currentPage === "detail" && selectedProductId &&
          <ProductDetail productId={selectedProductId} />}
        {currentPage === "cart" && <Cart />}
      </main>
    </>
  );
  // ❌ URL 안 바뀜, 뒤로가기 X, 즐겨찾기 X
}`,
        }}
        after={{
          label: "AFTER",
          filename: "App.tsx (깔끔)",
          code: `import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products"
          element={<Products />} />
        <Route path="products/:id"
          element={<ProductDetail />} />
        <Route path="cart"
          element={<Cart />} />
      </Route>
    </Routes>
  );
  // ✅ URL 바뀜, 뒤로가기 O, 즐겨찾기 O
}`,
        }}
      />

      <NewFile
        filename="src/components/Layout.tsx"
        description="Header를 모든 페이지에서 공유. Outlet으로 자식 페이지를 끼워 넣음."
        code={`import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />  {/* 자식 라우트가 여기 렌더링 */}
      </main>
    </div>
  );
}`}
      />

      <CodeCompare
        title="Header — 탭 버튼 → Link"
        before={{
          label: "BEFORE",
          filename: "Header.jsx",
          code: `// props: currentPage, onNavigate
<nav className="header-nav">
  <button
    className={currentPage === "products" ? "active" : ""}
    onClick={() => onNavigate("products")}>
    상품
  </button>
  <button onClick={() => onNavigate("cart")}>
    🛒 장바구니 ({cart.length})
  </button>
</nav>`,
        }}
        after={{
          label: "AFTER",
          filename: "Header.tsx",
          code: `// props 없이 Link 사용
import { Link } from "react-router-dom";

<nav className="flex items-center gap-6">
  <Link to="/products"
    className="text-gray-600 hover:text-gray-900">
    상품
  </Link>
  <Link to="/cart" className="relative ...">
    🛒 장바구니
    {cart.length > 0 && (
      <span className="absolute -top-2 ...">
        {cart.length}
      </span>
    )}
  </Link>
</nav>`,
        }}
      />

      <CodeCompare
        title="상품 상세 — ID 전달 방식"
        description="props로 selectedProductId 대신 URL 파라미터 사용"
        before={{
          label: "BEFORE",
          filename: "ProductDetail.jsx",
          code: `// props로 productId를 받음
export default function ProductDetail(
  { productId, addToCart, onBack }
) {
  const product = products.find(
    p => p.id === productId
  );
  // ...
}`,
        }}
        after={{
          label: "AFTER",
          filename: "ProductDetail.tsx",
          code: `import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  // /products/3 → id = "3"
  const product = products.find(
    p => p.id === Number(id)
  );
  // props 필요 없음!
}`,
        }}
      />
    </div>
  );
}
