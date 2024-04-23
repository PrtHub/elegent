import { Category } from "@prisma/client";
import CategoryItem from "./category-item";

type CategoriesProps = {
  items: () => Promise<Category[]>;
};

const Categories =async ({items}: CategoriesProps ) => {
  return (
    <section className="flex items-center gap-x-4 overflow-x-auto pb-2">
      {(await items()).map((category: Category) => (
        <CategoryItem
          key={category.id}
          label={category.name}
          value={category.id}
        />
      ))}
    </section>
  );
};

export default Categories;
