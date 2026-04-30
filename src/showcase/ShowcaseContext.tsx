import CodeCompare from "./CodeCompare";
import NewFile from "./NewFile";

export default function ShowcaseContext() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Context API</h2>
      <p className="text-gray-500 mb-8">Props Drilling → Context로 직접 접근</p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-red-800 mb-3">Props Drilling 문제</h3>
        <pre className="text-sm text-red-900 font-mono leading-relaxed">{`App  (cart, addToCart, removeFromCart 관리)
 └─ Layout             ← 안 쓰는데 전달만
     └─ Header         ← 안 쓰는데 전달만
         └─ CartIcon   ← 드디어 사용
     └─ ProductDetail  ← addToCart 필요한데 어떻게 전달?
     └─ Cart           ← cart, removeFromCart 필요`}</pre>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-green-800 mb-3">Context로 해결</h3>
        <pre className="text-sm text-green-900 font-mono leading-relaxed">{`CartProvider  (cart, addToCart, removeFromCart 보관)
 └─ App
     └─ Layout         ← cart 몰라도 됨
         └─ Header     ← useCart()로 직접 꺼냄 ✅
         └─ ProductDetail ← useCart()로 직접 꺼냄 ✅
         └─ Cart       ← useCart()로 직접 꺼냄 ✅`}</pre>
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

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

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
        before={{
          label: "BEFORE",
          filename: "App.tsx",
          code: `export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        ...
      </Route>
    </Routes>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "App.tsx",
          code: `import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          ...
        </Route>
      </Routes>
    </CartProvider>
  );
}`,
        }}
      />

      <CodeCompare
        title="Header — cart 접근 방식"
        before={{
          label: "BEFORE",
          filename: "Header.tsx",
          code: `// props로 cart를 받아야 함
interface HeaderProps {
  cart: Product[];
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header(
  { cart, currentPage, onNavigate }: HeaderProps
) {
  return (
    ...
    <span>🛒 ({cart.length})</span>
    ...
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Header.tsx",
          code: `// props 없이 직접 꺼냄
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    ...
    <span>🛒 ({cart.length})</span>
    ...
  );
}
// Header의 props가 사라짐!`,
        }}
      />

      <CodeCompare
        title="ProductDetail — addToCart 접근 방식"
        before={{
          label: "BEFORE",
          filename: "ProductDetail.jsx",
          code: `// props로 addToCart, onBack을 받아야 함
export default function ProductDetail(
  { productId, addToCart, onBack }
) {
  const product = products.find(
    p => p.id === productId
  );

  const handleAdd = () => {
    addToCart(product);
  };
}`,
        }}
        after={{
          label: "AFTER",
          filename: "ProductDetail.tsx",
          code: `// props 없이 직접 꺼냄
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = products.find(
    p => p.id === Number(id)
  );

  const handleAdd = () => {
    addToCart(product);
  };
}`,
        }}
      />

      <CodeCompare
        title="Cart 페이지"
        before={{
          label: "BEFORE",
          filename: "Cart.jsx",
          code: `// props: cart, removeFromCart, onNavigate
export default function Cart(
  { cart, removeFromCart, onNavigate }
) {
  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );
  // ...
}`,
        }}
        after={{
          label: "AFTER",
          filename: "Cart.tsx",
          code: `import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );
  // props 3개 → 0개!
}`,
        }}
      />
    </div>
  );
}
