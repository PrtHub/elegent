import db from "@/lib/db";
import Hero from "./_sections/hero";
import { Product } from "@prisma/client";
import ProductCard, { ProductCardSkeleton } from "@/components/product-card";
import Features from "./_sections/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

function getBestSellingProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: {
      orders: { _count: "desc" },
    },
    take: 4,
  });
}

async function getNewestProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
}

export default function Home() {
  return (
    <main className="space-y-20">
      <Hero />
      <Features />
      <section className="max-w-6xl mx-auto px-3 lg:px-5 space-y-20">
        <ProductGridSection
          title="Best Selling"
          productsFetcher={getBestSellingProducts}
        />
        <section className="w-full max-w-6xl mx-auto h-full flex flex-col-reverse sm:flex-row items-center justify-between gap-10 px-3 md:px-5">
          <article className="space-y-10 text-center sm:text-start">
            <span className="space-y-2">
              <h1 className="text-2xl md:text-2xl font-semibold text-slate-950">
                Browse Our Fashion Paradise!
              </h1>
              <p className="text-gray-600 text-sm tracking-wide sm:max-w-md">
                Step into a world of style and explore our diverse collection of
                clothing categories.
              </p>
            </span>
            <Button>
              <Link href={"/products"} className="flex items-center">
                Start Browsing
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </article>
          <section className="relative ">
            <Image
              src="/category-image.png"
              alt="ellipse"
              width={220}
              height={310}
              // className="z-0 w-64 md:w-[340px]"
            />
          </section>
        </section>
        <ProductGridSection
          title="Latest"
          productsFetcher={getNewestProducts}
        />
      </section>
    </main>
  );
}

type ProductGridSectionProps = {
  productsFetcher: () => Promise<Product[]>;
  title: string;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-8">
      <span>
        <h1 className="font-semibold text-2xl text-slate-900">{title}</h1>
      </span>
      <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-3 lg:gap-8">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </section>
    </section>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
