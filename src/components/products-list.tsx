import { Product } from "@prisma/client";
import ProductCard from "./product-card";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-3 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} {...product}/>
      ))}
      </section>

      {products.length === 0 && (
        <div className="text-center text-sm text-muted-foreground">
          No product found
        </div>
      )}
    </>
  );
};

export default ProductList;
