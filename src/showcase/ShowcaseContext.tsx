import CodeCompare from "./CodeCompare";
import NewFile from "./NewFile";

export default function ShowcaseContext() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Context API</h2>
      <p className="text-gray-500 mb-8">Router 도입 후 발생하는 Props Drilling → Context로 해결</p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-red-800 mb-3">
          Router 적용 후 생기는 문제
        </h3>
        <p className="text-red-700 text-sm mb-4">
          Router를 적용하면 App → Routes → Route → Layout → Header/Pages 구조가 됩니다.
          <br />
          cart 상태를 App에서 관리하면, Header나 ProductDetail에 어떻게 전달할까요?
        </p>
        <pre className="text-sm text-red-900 font-mono leading-relaxed bg-red-100 p-4 rounded">{`App  (cart를 여기서 관리하면?)
 └─ Routes
     └─ Route
         └─ Layout          ← props를 어떻게 넘기지?
             ├─ Header      ← cart.length 필요
             └─ Outlet
                 ├─ ProductDetail  ← addToCart 필요
                 └─ Cart           ← cart, removeFromCart 필요

Router의 Route/Outlet 구조에서는
App → Layout으로 props를 직접 넘기기 어려움!`}</pre>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-amber-800 mb-3">
          억지로 해결하면? — Layout에 상태 몰아넣기
        </h3>
        <pre className="text-sm text-amber-900 font-mono leading-relaxed bg-amber-100 p-4 rounded">{`// Layout.tsx에 cart 상태를 넣으면?
function Layout() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => { ... };
  const removeFromCart = (id: number) => { ... };

  return (
    <>
      <Header cart={cart} />  {/* ← 넘길 수 있음 */}
      <Outlet />  {/* ← 근데 여기 자식에게는 어떻게? */}
                  {/* ProductDetail에 addToCart를 못 넘김! */}
                  {/* Outlet은 props를 안 받음 */}
    </>
  );
}

// Outlet의 자식(ProductDetail, Cart)에게
// props를 넘기는 깔끔한 방법이 없음 ❌`}</pre>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-green-800 mb-3">Context로 해결</h3>
        <pre className="text-sm text-green-900 font-mono leading-relaxed bg-green-100 p-4 rounded">{`CartProvider  (cart, addToCart, removeFromCart 보관)
 └─ App
     └─ Routes
         └─ Route
             └─ Layout       ← cart 몰라도 됨, props 없음!
                 ├─ Header   ← useCart()로 직접 꺼냄 ✅
                 └─ Outlet
                     ├─ ProductDetail ← useCart()로 직접 ✅
                     └─ Cart          ← useCart()로 직접 ✅`}</pre>
      </div>

      <NewFile
        filename="src/contexts/CartContext.tsx"
        description="장바구니 상태를 관리하는 Context + Provider + 커스텀 훅"
        code={`import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/product";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) =>
    setCart(prev => [...prev, product]);

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(p => p.id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}`}
      />

      <CodeCompare
        title="App.tsx — Provider 감싸기"
        description="Cart 상태 관리를 App에서 할 필요 없어짐"
        before={{
          label: "BEFORE (Router만 적용)",
          filename: "App.tsx",
          code: `// cart 상태를 어디에 둘지 난감...
// Layout? App? 어디든 Outlet 자식에게 못 넘김

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
}`,
        }}
        after={{
          label: "AFTER (Context 적용)",
          filename: "App.tsx",
          code: `import { CartProvider }
  from "./contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
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
    </CartProvider>
  );
}
// CartProvider 안이면 어디서든 useCart()`,
        }}
      />

      <CodeCompare
        title="Layout — props 완전 제거"
        description="starter에서 cart, currentPage, onNavigate를 받던 Layout이 props 0개로"
        before={{
          label: "BEFORE (starter)",
          filename: "Layout.jsx",
          code: `// cart를 안 쓰면서 Header에 넘기기 위해 받음
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
      <div style={{ maxWidth: 960, ... }}>
        {children}
      </div>
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Layout.tsx",
          code: `// props 0개!
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
        title="Header — props → useCart()"
        before={{
          label: "BEFORE (starter)",
          filename: "Header.jsx",
          code: `// Layout에서 props로 받음
export default function Header(
  { cart, currentPage, onNavigate }
) {
  return (
    <div style={{ background: "#eee", ... }}>
      <b onClick={() => onNavigate("home")}>
        Mini Mall
      </b>
      <button onClick={() => onNavigate("cart")}>
        장바구니 ({cart.length})
      </button>
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Header.tsx",
          code: `import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

// props 없음! 직접 꺼냄
export default function Header() {
  const { cart } = useCart();

  return (
    <header className="bg-white shadow ...">
      <Link to="/">🛍️ Mini Mall</Link>
      <Link to="/cart">
        🛒 장바구니
        {cart.length > 0 && (
          <span className="...">{cart.length}</span>
        )}
      </Link>
    </header>
  );
}`,
        }}
      />

      <CodeCompare
        title="ProductDetail — addToCart 접근"
        before={{
          label: "BEFORE (starter)",
          filename: "ProductDetail.jsx",
          code: `// App에서 props로 받아야 함
export default function ProductDetail(
  { productId, addToCart, onBack }
) {
  const product = products.find(
    p => p.id === productId
  );

  const handleAdd = () => {
    addToCart(product);
  };

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
          code: `import { useCart } from "../contexts/CartContext";
import { useParams, Link } from "react-router-dom";

// props 0개!
export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = products.find(
    p => p.id === Number(id)
  );

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <div>
      <Link to="/products">← 목록으로</Link>
      ...
    </div>
  );
}`,
        }}
      />

      <CodeCompare
        title="Cart — cart, removeFromCart 접근"
        before={{
          label: "BEFORE (starter)",
          filename: "Cart.jsx",
          code: `// props 3개: cart, removeFromCart, onNavigate
export default function Cart(
  { cart, removeFromCart, onNavigate }
) {
  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );
  return (
    <div>
      {cart.map(item => (
        <div>
          {item.name}
          <button onClick={
            () => removeFromCart(item.id)
          }>삭제</button>
        </div>
      ))}
      <button onClick={() => onNavigate("products")}>
        상품 보러가기
      </button>
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Cart.tsx",
          code: `import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

// props 0개!
export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );
  return (
    <div>
      {cart.map(item => (
        <div>
          {item.name}
          <button onClick={
            () => removeFromCart(item.id)
          }>삭제</button>
        </div>
      ))}
      <Link to="/products">상품 보러가기</Link>
    </div>
  );
}`,
        }}
      />
    </div>
  );
}
