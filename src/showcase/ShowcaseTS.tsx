import CodeCompare from "./CodeCompare";
import NewFile from "./NewFile";

export default function ShowcaseTS() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">TypeScript</h2>
      <p className="text-gray-500 mb-8">.jsx → .tsx 변환 + 타입 추가</p>

      <NewFile
        filename="src/types/product.ts"
        description="상품 타입 정의 — 모든 컴포넌트에서 재사용"
        code={`export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}`}
      />

      <CodeCompare
        title="더미 데이터"
        description="타입을 적용하면 필드 누락 시 빨간 줄이 뜹니다"
        before={{
          label: "BEFORE",
          filename: "data/products.js",
          code: `export const products = [
  {
    id: 1,
    name: "오버사이즈 티셔츠",
    price: 29000,
    image: "https://...",
    description: "...",
  },
  // 필드 빠뜨려도 에러 없음
];`,
        }}
        after={{
          label: "AFTER",
          filename: "data/products.ts",
          code: `import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "오버사이즈 티셔츠",
    price: 29000,
    image: "https://...",
    description: "...",
  },
  // 필드 빠뜨리면 ❌ 빨간 줄!
];`,
        }}
      />

      <CodeCompare
        title="컴포넌트 Props"
        description="props에 타입을 지정하면 잘못된 값을 넘길 때 IDE가 알려줍니다"
        before={{
          label: "BEFORE",
          filename: "components/ProductCard.jsx",
          code: `// props에 뭐가 들어있는지 모름
// product.naem 같은 오타도 에러 안 남

export default function ProductCard({ product, onSelect }) {
  return (
    <div onClick={() => onSelect(product.id)}>
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}`,
        }}
        after={{
          label: "AFTER",
          filename: "components/ProductCard.tsx",
          code: `import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onSelect: (id: number) => void;
}

export default function ProductCard(
  { product, onSelect }: ProductCardProps
) {
  return (
    <div onClick={() => onSelect(product.id)}>
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}`,
        }}
      />

      <CodeCompare
        title="useState 제네릭"
        description="초기값이 빈 배열이면 never[]로 추론됨 → 제네릭 필수"
        before={{
          label: "BEFORE",
          filename: "App.jsx",
          code: `const [cart, setCart] = useState([]);
// cart의 타입: never[]
// setCart에 뭘 넣어도 에러 안 남

const addToCart = (product) => {
  setCart(prev => [...prev, product]);
};`,
        }}
        after={{
          label: "AFTER",
          filename: "App.tsx",
          code: `const [cart, setCart] = useState<Product[]>([]);
// cart의 타입: Product[]
// setCart에 Product가 아닌 값 넣으면 ❌

const addToCart = (product: Product) => {
  setCart(prev => [...prev, product]);
};`,
        }}
      />
    </div>
  );
}
