import db from "@/lib/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/checkout-form";
import { usableDiscountCodeWhere } from "@/lib/coupons-helper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { productId },
  searchParams: { coupon },
}: {
  params: { productId: string };
  searchParams: { coupon?: string };
}) {
  const product = await db.product.findUnique({ where: { id: productId } });
  if (product == null) return notFound();

  const discountCode =
    coupon == null ? undefined : await getDiscountCode(coupon, product.id);

  return (
    <CheckoutForm
      product={product}
      discountCode={discountCode || undefined}
    />
  );
}

function getDiscountCode(coupon: string, productId: string) {
  return db.discountCode.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: {...usableDiscountCodeWhere, code: coupon },
  });
}
