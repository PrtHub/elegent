import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  isAvailableForPurchase: boolean;
};

const ProductCard = ({
  id,
  name,
  priceInCents,
  imagePath,
  isAvailableForPurchase,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className="flex flex-col gap-2">
        <section className=" bg-gray-50 rounded">
          <div className="rounded relative">
            <Image
              src={imagePath}
              alt="Product Image"
              width={224}
              height={208}
              className="w-[224px] h-[280px] object-cover"
            />
          </div>
        </section>
        <article className="flex flex-col gap-y-3 px-4 py-2">
          <h1 className="text-sm lg:text-base font-semibold capitalize text-slate-900">
            {name}
          </h1>
          <span className="flex justify-between items-center text-slate-600 ">
            <p className="uppercase text-xs lg:text-sm">
              {isAvailableForPurchase ? "In stock" : "Out of stock"}
            </p>
            <p className="text-sm">{formatCurrency(priceInCents / 100)}</p>
          </span>
        </article>
      </Card>
    </Link>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <Card className="flex flex-col gap-2 animate-pulse">
      <section className=" bg-gray-300 rounded">
        <div className="rounded relative w-[224px] h-[280px] bg-gray-300"></div>
      </section>
      <article className="flex flex-col gap-y-3 py-2">
        <span className="w-full h-3 bg-gray-300"></span>
        <span className="flex justify-between items-center text-slate-600 gap-10">
          <p className="uppercase text-xs lg:text-sm w-1/2 h-3 bg-gray-300"></p>
          <p className="text-sm w-1/2 h-3 bg-gray-300"></p>
        </span>
      </article>
    </Card>
  );
};
