import db from "@/lib/db";
import PageHeader from "../../_components/page-header";
import DiscountCodeForm from "../_components/discountCode-form";

const NewCouponPage = async () => {
  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return (
    <section className="pt-20 md:pt-10 px-5 pb-5 space-y-8">
      <PageHeader>Add Coupon</PageHeader>
      <DiscountCodeForm products={products} />
    </section>
  );
};

export default NewCouponPage;
