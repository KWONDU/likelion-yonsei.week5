import CodeCompare from "./CodeCompare";

export default function ShowcaseRouter() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">React Router DOM</h2>
      <p className="text-gray-500 mb-8">useState 탭 전환 → URL 기반 페이지 전환</p>

      <CodeCompare
        title="main — BrowserRouter 감싸기"
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
        title="App — 페이지 전환 방식"
        description="useState 조건부 렌더링 → Routes/Route 매칭. 코드량도 줄어듦."
        before={{
          label: "BEFORE",
          filename: "App.jsx",
          code: `export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] =
    useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => { ... };
  const removeFromCart = (id) => { ... };
  const handleNavigate = (page) => { ... };
  const handleSelectProduct = (id) => { ... };

  return (
    <Layout cart={cart} currentPage={currentPage}
      onNavigate={handleNavigate}>

      {currentPage === "home" && <Home ... />}
      {currentPage === "products" && <Products ... />}
      {currentPage === "detail" && selectedProductId &&
        <ProductDetail productId={selectedProductId}
          addToCart={addToCart} onBack={...} />}
      {currentPage === "cart" &&
        <Cart cart={cart} removeFromCart={removeFromCart}
          onNavigate={handleNavigate} />}

    </Layout>
  );
  // ❌ URL 안 바뀜, 뒤로가기 X, 즐겨찾기 X
}`,
        }}
        after={{
          label: "AFTER",
          filename: "App.tsx",
          code: `export default function App() {
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
  // ✅ useState, 핸들러 함수 전부 사라짐
}`,
        }}
      />

      <CodeCompare
        title="Layout — props 전달자 → Outlet 레이아웃"
        description="starter에서 Layout은 안 쓰는 props를 받아서 Header에 넘기기만 했음. Router 적용 후 Outlet으로 자식 페이지를 끼워 넣는 역할로 변경."
        before={{
          label: "BEFORE",
          filename: "Layout.jsx (props 전달자)",
          code: `// cart를 안 쓰는데 Header에 넘기기 위해 받음
export default function Layout({
  cart,
  currentPage,
  onNavigate,
  children,
}) {
  return (
    <div>
      <Header
        cart={cart}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      <div style={{ maxWidth: 960, margin: "0 auto",
        padding: "32px 16px" }}>
        {children}
      </div>
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Layout.tsx (Outlet)",
          code: `import { Outlet } from "react-router-dom";
import Header from "./Header";

// props 없음! Header도 자체적으로 상태 접근
export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}`,
        }}
      />

      <CodeCompare
        title="Header — 탭 버튼 → Link"
        before={{
          label: "BEFORE",
          filename: "Header.jsx",
          code: `// props: cart, currentPage, onNavigate
export default function Header(
  { cart, currentPage, onNavigate }
) {
  return (
    <div style={{ background: "#eee", ... }}>
      <b onClick={() => onNavigate("home")}>
        Mini Mall
      </b>
      <div>
        <button onClick={() => onNavigate("products")}>
          상품
        </button>
        <button onClick={() => onNavigate("cart")}>
          장바구니 ({cart.length})
        </button>
      </div>
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Header.tsx",
          code: `import { Link } from "react-router-dom";

// currentPage, onNavigate props 사라짐
export default function Header() {
  return (
    <header className="bg-white shadow ...">
      <Link to="/" className="text-xl font-bold">
        🛍️ Mini Mall
      </Link>
      <nav className="flex items-center gap-6">
        <Link to="/products" className="...">
          상품
        </Link>
        <Link to="/cart" className="relative ...">
          🛒 장바구니
        </Link>
      </nav>
    </header>
  );
}`,
        }}
      />

      <CodeCompare
        title="상품 상세 — ID 전달 방식"
        description="props로 productId 받던 것 → URL 파라미터로 변경"
        before={{
          label: "BEFORE",
          filename: "ProductDetail.jsx",
          code: `// props로 productId, onBack을 받음
export default function ProductDetail(
  { productId, addToCart, onBack }
) {
  const product = products.find(
    p => p.id === productId
  );

  return (
    <div>
      <button onClick={onBack}>← 목록으로</button>
      ...
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "ProductDetail.tsx",
          code: `import { useParams, Link } from
  "react-router-dom";

// props 필요 없음!
export default function ProductDetail() {
  const { id } = useParams();
  // /products/3 → id = "3"
  const product = products.find(
    p => p.id === Number(id)
  );

  return (
    <div>
      <Link to="/products">← 목록으로</Link>
      ...
    </div>
  );
}`,
        }}
      />
    </div>
  );
}
