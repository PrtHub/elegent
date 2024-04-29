"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { addDiscountCode } from "../../_actions/coupons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DiscountCodeType } from "@prisma/client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const DiscountCodeForm = ({
  products,
}: {
  products: { name: string; id: string }[];
}) => {
  const [error, action] = useFormState(addDiscountCode, {});
  const [allProducts, setAllProducts] = useState(true);

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input type="text" id="code" name="code" required />
        {error.code && <div className="text-destructive">{error.code}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="discountType">Discount Type</Label>
        <RadioGroup
          id="discountType"
          name="discountType"
          defaultValue={DiscountCodeType.PERCENTAGE}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem
              id="percentage"
              value={DiscountCodeType.PERCENTAGE}
            />
            <Label htmlFor="percentage">Percentage</Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem id="fixed" value={DiscountCodeType.FIXED} />
            <Label htmlFor="percentage">Fixed</Label>
          </div>
        </RadioGroup>
        {error.discountType && (
          <div className="text-destructive">{error.discountType}</div>
        )}
      </div>
      <div className="space-y-2 ">
        <Label htmlFor="discountAmount">Discount Amount</Label>
        <Input
          type="number"
          id="discountAmount"
          name="discountAmount"
          required
        />
        {error.discountAmount && (
          <div className="text-destructive">{error.discountAmount}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="limit">Limit</Label>
        <Input type="number" id="limit" name="limit" />
        <span className="text-muted-foreground text-sm mt-1">
          Leave blank for infinite uses
        </span>
        {error.limit && <div className="text-destructive">{error.limit}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiresAt">Expiration</Label>
        <Input
          type="datetime-local"
          id="expiresAt"
          name="expiresAt"
          className="w-max"
          min={today.toJSON().split(":").slice(0, -1).join(":")}
        />
        <div className="text-muted-foreground text-sm mt-1">
          Leave blank for no expiration
        </div>
        {error.expiresAt && (
          <div className="text-destructive">{error.expiresAt}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label>Allowed Products</Label>
        {error.allProducts && (
          <div className="text-destructive">{error.allProducts}</div>
        )}
        {error.productIds && (
          <div className="text-destructive">{error.productIds}</div>
        )}
        <div className="flex gap-2 items-center">
          <Checkbox
            id="allProducts"
            name="allProducts"
            checked={allProducts}
            onCheckedChange={(e) => setAllProducts(e === true)}
          />
          <Label htmlFor="allProducts">All Products</Label>
        </div>
        {products.map((product) => (
          <div className="flex gap-2 items-center" key={product.id}>
            <Checkbox
              id={product.id}
              name="productIds"
              disabled={allProducts}
              value={product.id}
            />
            <Label htmlFor={product.id}>{product.name}</Label>
          </div>
        ))}
      </div>
      <SubmitButton />
    </form>
  );
};

export default DiscountCodeForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"black"} disabled={pending}>
      {" "}
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
