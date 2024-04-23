"use client";

import { Category } from "@prisma/client";
import CategoryItem from "./category-item";

// type CategoriesProps = {
//   items: () => Promise<Category[]>;
// };

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <section className="flex items-center gap-x-4 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </section>
  );
};

export default Categories;
