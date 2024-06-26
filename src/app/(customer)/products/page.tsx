import db from "@/lib/db";
import { cache } from "@/lib/cache";

import Categories from "./_components/categories";
import ProductList from "@/components/products-list";
import SearchInput from "@/components/search-input";
import { Suspense } from "react";

interface GetCourses {
  name?: string;
  categoryId?: string;
}

interface SearchParamsProps {
  searchParams: {
    name: string;
    categoryId: string;
  };
}

const getProducts = cache(
  ({ name, categoryId }: GetCourses) => {
    return db.product.findMany({
      where: {
        isAvailableForPurchase: true,
        name: {
          contains: name,
        },
        categoryId,
      },
      orderBy: { name: "asc" },
      include: {
        category: true,
      },
    });
  },
  ["/products", "getProducts"],
  { revalidate: 60 * 60 * 24 }
);

async function ProductsPage({ searchParams }: SearchParamsProps) {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const products = await getProducts({ ...searchParams });

  return (
    <Suspense>
      <section className="w-full flex flex-col gap-y-8 sm:gap-y-12 mt-10 px-3 max-w-6xl mx-auto">
        <section className="sm:hidden block">
          <SearchInput />
        </section>
        <Categories items={categories} />
        <ProductList products={products} />
      </section>
    </Suspense>
  );
}

export default ProductsPage;
