import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

// Showcase (발표용)
import ShowcaseHome from "./showcase/ShowcaseHome";
import ShowcaseLayout from "./showcase/ShowcaseLayout";
import ShowcaseTS from "./showcase/ShowcaseTS";
import ShowcaseTailwind from "./showcase/ShowcaseTailwind";
import ShowcaseRouter from "./showcase/ShowcaseRouter";
import ShowcaseContext from "./showcase/ShowcaseContext";

// Shop (실제 쇼핑몰 데모)
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* 루트 → 쇼케이스 홈 */}
        <Route index element={<Navigate to="/showcase" replace />} />

        {/* 쇼케이스 (발표용 Before/After 비교) */}
        <Route path="showcase" element={<ShowcaseHome />} />
        <Route path="showcase" element={<ShowcaseLayout />}>
          <Route path="typescript" element={<ShowcaseTS />} />
          <Route path="tailwind" element={<ShowcaseTailwind />} />
          <Route path="router" element={<ShowcaseRouter />} />
          <Route path="context" element={<ShowcaseContext />} />
        </Route>

        {/* 실제 쇼핑몰 데모 */}
        <Route path="shop" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
