import db from "@/lib/db";

import PageHeader from "@/app/admin/_components/page-header";
import ProductForm from "../../_components/product-form";

const EditPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <section className="pt-20 md:pt-10 px-5 pb-5 space-y-8">
      <PageHeader>Edit Product</PageHeader>
      <ProductForm
        product={product}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </section>
  );
};

export default EditPage;
