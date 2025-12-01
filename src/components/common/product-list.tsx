import ProductItem from "./product-item";

interface ProductVariant {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  color: string;
  priceInCents: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  variants: ProductVariant[];
}

interface ProductListProps {
  title: string;
  products: Product[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6 ">
      <div className="mx-auto w-full max-w-7xl px-4 py-5">
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          {title}
        </h2>
        <div className="bg-primary h-1 w-20"></div>
      </div>
      <div className="overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="w-[calc(50%-0.5rem)] shrink-0 snap-start sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] xl:w-[calc(16.666%-0.83rem)]"
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
