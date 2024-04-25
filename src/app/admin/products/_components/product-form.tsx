"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatter";
import { addProducts, updateProducts } from "../../_actions/products";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductFormProps {
  options: { label: string; value: string }[];
  product?: Product | null;
}

const ProductForm = ({ options, product }: ProductFormProps) => {
  const [error, action] = useFormState(
    product == null ? addProducts : updateProducts.bind(null, product.id),
    {}
  );

  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && (
          <span className="text-destructive text-sm">{error.name}</span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          required
        />
        <p className="text-muted-foreground mt-2">
          {formatCurrency((priceInCents || 0) / 100)}
        </p>
        {error.priceInCents && (
          <span className="text-destructive text-xs">{error.priceInCents}</span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {error.description && (
          <span className="text-destructive text-sm">{error.description}</span>
        )}
      </div>
      <div className="space-y-2  flex flex-col">
        <Label htmlFor="color">Color</Label>
        <Select name="color" defaultValue={product?.color || ""}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Selete a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="yellow">Yellow</SelectItem>
            <SelectItem value="gray">Gray</SelectItem>
          </SelectContent>
        </Select>
        {error.color && (
          <span className="text-destructive text-sm">{error.color}</span>
        )}
      </div>
      <div className="space-y-2 flex flex-col">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={product?.categoryId || ""}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Selete a category" />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error.category && (
          <span className="text-destructive text-sm">{error.category}</span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && (
          <span className="text-xs text-muted-foreground">
            {product?.filePath}
          </span>
        )}
        {error.file && (
          <span className="text-destructive text-sm">{error.file}</span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product?.imagePath}
            alt={product?.name}
            width={350}
            height={400}
            className="rounded-md"
          />
        )}
        {error.image && (
          <span className="text-destructive text-sm">{error.image}</span>
        )}
      </div>
      <SubmitButton />
    </form>
  );
};

export default ProductForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"black"} disabled={pending}>
      {" "}
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
