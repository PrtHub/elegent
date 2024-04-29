"use client";

import { createPaymentIntent } from "@/app/(customer)/_actions/payment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDiscountedAmount } from "@/lib/coupons-helper";
import { formatCurrency, formatDiscountCode } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { DiscountCodeType } from "@prisma/client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  discountCode?: {
    id: string;
    discountAmount: number;
    discountType: DiscountCodeType;
  };
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ product, discountCode }: CheckoutFormProps) {
  const amount =
    discountCode == null
      ? product.priceInCents
      : getDiscountedAmount(discountCode, product.priceInCents);

  const isDiscounted = amount != product.priceInCents;

  return (
    <section className="max-w-5xl w-full mx-auto space-y-10 mt-10">
      <section className="flex gap-4 items-center">
        <Card className="bg-gray-50 w-[320px] sm:w-fit">
          <Image
            src={product.imagePath}
            alt={product?.name || ""}
            width={320}
            height={320}
            className="w-[320px] h-80"
          />
        </Card>
        <article className="flex flex-col items-start justify-start gap-y-4">
          <div className="flex gap-3 items-center">
            <span
              className={cn(
                isDiscounted
                  ? "text-sm line-through text-muted-foreground"
                  : "text-2xl font-bold"
              )}
            >
              {formatCurrency(product.priceInCents / 100)}
            </span>
            {isDiscounted && (
              <span className="text-xl font-bold">
                {formatCurrency(amount / 100)}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-2 max-w-md text-muted-foreground ">
            {product.description}
          </div>
        </article>
      </section>
      <Elements
        options={{ amount, mode: "payment", currency: "usd" }}
        stripe={stripePromise}
      >
        <Form
          amount={amount}
          productId={product.id}
          discountCode={discountCode}
        />
      </Elements>
    </section>
  );
}

function Form({
  amount,
  productId,
  discountCode,
}: {
  amount: number;
  productId: string;
  discountCode?: {
    id: string;
    discountAmount: number;
    discountType: DiscountCodeType;
  };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const discountCodeRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const coupon = searchParams.get("coupon");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);
    const formSubmit = await elements.submit();
    if (formSubmit.error != null) {
      setErrorMessage(formSubmit.error.message);
      setIsLoading(false);
      return;
    }

    const paymentIntent = await createPaymentIntent(
      email,
      productId,
      discountCode?.id
    );
    if (paymentIntent.error != null) {
      setErrorMessage(paymentIntent.error);
      setIsLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        clientSecret: paymentIntent.clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/${productId}/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>

          <CardDescription className="text-destructive">
            {errorMessage && <span>{errorMessage}</span>}
            {coupon != null && discountCode == null && (
              <span>Invalid discount code</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
          <div className="space-y-2  mt-4">
            <Label htmlFor="discountCode">Coupon</Label>
            <div className="flex items-center gap-4">
              <Input
                type="text"
                id="discountCode"
                name="discountCode"
                className="max-w-xs w-full"
                defaultValue={coupon || ""}
                ref={discountCodeRef}
              />
              <Button
                type="button"
                variant="black"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("coupon", discountCodeRef.current?.value || "");
                  router.push(`${pathname}?${params.toString()}`);
                }}
              >
                Apply
              </Button>
              {discountCode != null && (
                <span className="text-muted-foreground">
                  {formatDiscountCode(discountCode)} discount
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            variant={"black"}
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(amount / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
