// import { Category } from "@prisma/client";
import { Category } from "@prisma/client";
import CategoryItem from "./category-item";

// type CategoriesProps = {
//   items: () => Promise<Category[]>;
// };

const Categories = ({items}: {items: Category[]} ) => {
  return (
    <section className="flex items-center gap-x-4 overflow-x-auto pb-2">
      {items.map((category) => (
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
