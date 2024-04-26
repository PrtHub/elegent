import ProductCard, { ProductCardSkeleton } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import db from "@/lib/db";
import { formatCurrency } from "@/lib/formatter";
import { Product } from "@prisma/client";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
    include: {
      category: true,
    },
  });

  const similarProducts = await db.product.findMany({
    where: {
      categoryId: product?.categoryId,
      id: {
        not: params.productId,
      },
    },
    take: 4,
  });

  const image = product?.imagePath || "/path/to/default/image.png";

  return (
    <section className="max-w-6xl mx-auto w-full h-full flex flex-col gap-y-20 items-start mt-10 px-3">
      <section className="w-full h-full flex flex-col sm:flex-row sm:items-center justify-between gap-7 md:gap-14">
        <Card className="bg-gray-50 w-[350px] sm:w-fit">
          <Image
            src={image}
            alt={product?.name || ""}
            width={350}
            height={400}
            className="w-[350px] h-[380px] lg:h-[400px]"
          />
        </Card>
        <article className="flex flex-col items-start justify-start gap-y-4">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-wide">
            {product?.name}
          </h1>
          <span className="text-sm text-gray-500 uppercase font-medium flex items-center">
            ({product?.isAvailableForPurchase ? "In stock" : "Out of stock"}){" "}
            <Dot />
            {product?.color} <Dot /> {product?.category?.name}
          </span>
          <p className="text-gray-500 text-sm tracking-wide sm:max-w-2xl mt-2">
            {product?.description}
          </p>
          <span className="text-xl font-semibold text-slate-900 mt-2">
            {product && product.priceInCents
              ? formatCurrency(product.priceInCents / 100)
              : "NaN"}
          </span>
          <Button className="bg-slate-900 mt-2" asChild>
            <Link href={`/products/${params.productId}/purchase`}>
              Purchase Now
            </Link>
          </Button>
        </article>
      </section>

      <section className="flex flex-col items-start justify-start gap-y-10 mt-10">
        <span className="flex flex-col gap-2">
          <h1 className="text-slate-900 font-semibold text-2xl">
            You might also like
          </h1>
          <p className="text-gray-400 tracking-wide text-sm">
            SIMILAR PRODUCTS
          </p>
        </span>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-3 lg:gap-8">
            {similarProducts.map((product: Product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        </Suspense>
      </section>
    </section>
  );
};

export default ProductIdPage;
