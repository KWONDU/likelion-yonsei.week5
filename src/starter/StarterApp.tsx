import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";

// ── Starter 전용 컴포넌트 (인라인 스타일, props drilling, 탭 전환) ──

function StarterHeader({
  cart,
  currentPage,
  onNavigate,
}: {
  cart: Product[];
  currentPage: string;
  onNavigate: (p: string) => void;
}) {
  return (
    <div
      style={{
        background: "#eee",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <b style={{ cursor: "pointer" }} onClick={() => onNavigate("home")}>
        Mini Mall
      </b>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => onNavigate("home")}>홈</button>
        <button onClick={() => onNavigate("products")}>상품</button>
        <button onClick={() => onNavigate("cart")}>
          장바구니 ({cart.length})
        </button>
      </div>
    </div>
  );
}

function StarterLayout({
  cart,
  currentPage,
  onNavigate,
  children,
}: {
  cart: Product[];
  currentPage: string;
  onNavigate: (p: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <StarterHeader cart={cart} currentPage={currentPage} onNavigate={onNavigate} />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
        {children}
      </div>
    </div>
  );
}

function StarterProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (id: number) => void;
}) {
  return (
    <div
      onClick={() => onSelect(product.id)}
      style={{ border: "1px solid #ccc", padding: 12, cursor: "pointer" }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: 150, objectFit: "cover" }}
      />
      <p><b>{product.name}</b></p>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}

function StarterHome({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <h1>Mini Shopping Mall</h1>
      <p style={{ color: "#666", margin: "12px 0 24px" }}>
        Before — JS / 인라인 스타일 / 탭 전환 / Props Drilling
      </p>
      <button onClick={() => onNavigate("products")}>상품 보러가기</button>
    </div>
  );
}

function StarterProducts({ onSelectProduct }: { onSelectProduct: (id: number) => void }) {
  return (
    <div>
      <h2>전체 상품</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 16,
        }}
      >
        {products.map((p) => (
          <StarterProductCard key={p.id} product={p} onSelect={onSelectProduct} />
        ))}
      </div>
    </div>
  );
}

function StarterProductDetail({
  productId,
  addToCart,
  onBack,
}: {
  productId: number;
  addToCart: (p: Product) => void;
  onBack: () => void;
}) {
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div>
        <p>상품을 찾을 수 없습니다.</p>
        <button onClick={onBack}>목록으로</button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: 16 }}>← 목록으로</button>
      <div style={{ display: "flex", gap: 24 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "50%", height: 300, objectFit: "cover" }}
        />
        <div>
          <h2>{product.name}</h2>
          <p style={{ fontSize: 20, color: "#2563eb", margin: "8px 0 16px" }}>
            {product.price.toLocaleString()}원
          </p>
          <p style={{ color: "#666", marginBottom: 24 }}>{product.description}</p>
          <button
            onClick={handleAdd}
            style={{
              padding: "10px 20px",
              background: added ? "green" : "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {added ? "✓ 담았습니다!" : "장바구니 담기"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StarterCart({
  cart,
  removeFromCart,
  onNavigate,
}: {
  cart: Product[];
  removeFromCart: (id: number) => void;
  onNavigate: (p: string) => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <p>장바구니가 비어있습니다.</p>
        <button onClick={() => onNavigate("products")}>상품 보러가기</button>
      </div>
    );
  }

  return (
    <div>
      <h2>장바구니</h2>
      {cart.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 12,
            borderBottom: "1px solid #ddd",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: 60, height: 60, objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <b>{item.name}</b>
            <p>{item.price.toLocaleString()}원</p>
          </div>
          <button onClick={() => removeFromCart(item.id)}>삭제</button>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0",
          borderTop: "2px solid #333",
          marginTop: 12,
        }}
      >
        <span>총 {cart.length}개</span>
        <b style={{ fontSize: 20 }}>{total.toLocaleString()}원</b>
      </div>
    </div>
  );
}

// ── 메인 ──

export default function StarterApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProductId(null);
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProductId(id);
    setCurrentPage("detail");
  };

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{
        background: "#1e3a5f",
        color: "white",
        textAlign: "center",
        padding: "8px",
        fontSize: 13,
      }}>
        ⚠️ BEFORE — JS / 인라인 스타일 / 탭 전환(URL 안 바뀜) / Props Drilling
        {" · "}
        <Link to="/shop" style={{ color: "#93c5fd" }}>After 버전 보기 →</Link>
      </div>
      <StarterLayout cart={cart} currentPage={currentPage} onNavigate={handleNavigate}>
        {currentPage === "home" && <StarterHome onNavigate={handleNavigate} />}
        {currentPage === "products" && <StarterProducts onSelectProduct={handleSelectProduct} />}
        {currentPage === "detail" && selectedProductId && (
          <StarterProductDetail
            productId={selectedProductId}
            addToCart={addToCart}
            onBack={() => handleNavigate("products")}
          />
        )}
        {currentPage === "cart" && (
          <StarterCart cart={cart} removeFromCart={removeFromCart} onNavigate={handleNavigate} />
        )}
      </StarterLayout>
    </div>
  );
}
