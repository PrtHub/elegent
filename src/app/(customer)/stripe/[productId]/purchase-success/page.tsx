import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Successpage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });

  if (product == null) {
    return redirect("/");
  }

  return (
    <section className="w-full h-full flex flex-col items-center justify-between gap-20">
      <div className="w-full h-24 md:h-20 bg-[#83b18bdc] text-black">
        <div className="max-w-7xl w-full mx-auto px-5 py-4 text-xl font-normal">
          You have successfully purchased the{" "}
          <span className="font-semibold"> {product?.name}</span>. Try to{" "}
          <a
            className="underline font-medium"
            href={`/api/products/download/${await createDownloadVerification(
              params.productId
            )}`}
          >
            Download
          </a>{" "}
          now.
        </div>
      </div>
      <section className="w-full h-full flex flex-col items-center justify-center gap-6">
        <Image
          src="/Illustration.png"
          alt="Illustration"
          width={170}
          height={170}
          loading="lazy"
        />
        <article className="w-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-2xl font-semibold text-black">
            Thank you for shopping
          </h1>
          <p className="text-center text-black/80">
            Your order has been successfully placed and is now <br /> being
            processed.
          </p>
          <Button asChild variant={"black"}>
            <Link href={"/products"}>Go to products</Link>
          </Button>
        </article>
      </section>
    </section>
  );
};

export default Successpage;

async function createDownloadVerification(productId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
}
