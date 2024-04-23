"use client";

import ProductCard, { ProductCardSkeleton } from "@/components/product-card";
import db from "@/lib/db";
import { Suspense } from "react";
import Categories from "./_components/categories";
import { useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";

const getProducts = (categoryId: string): Promise<Product[]> => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
      categoryId: categoryId,
    },
    orderBy: { name: "asc" },
    include: {
      category: true,
    },
  });
};

const getCategories = () => {
  return db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

function ProductsPage() {
  // const products = await db.product.findMany({
  //   where: { isAvailableForPurchase: true },
  //   orderBy: { name: "asc" },
  //   include: {
  //     category: true,
  //   },
  // });
  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  // });

  return (
    <section className="w-full flex flex-col gap-y-12 mt-10 px-3 max-w-6xl mx-auto">
      <Categories items={getCategories} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-3 lg:gap-8">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense />
        </Suspense>
      </div>
    </section>
  );
}

export default ProductsPage;

async function ProductSuspense() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const products = getProducts(categoryId as string);

  return (await products).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
