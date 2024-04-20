import db from "@/lib/db";
import PageHeader from "../../_components/page-header";
import ProductForm from "../_components/product-form";

const NewProductPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <section className="pt-20 md:pt-10 px-5 pb-5 space-y-8">
      <PageHeader>Add Product</PageHeader>
      <ProductForm
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </section>
  );
};

export default NewProductPage;
