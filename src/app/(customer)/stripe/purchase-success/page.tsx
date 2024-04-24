import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const Successpage = async () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-between gap-20">
      <div className="w-full h-20 bg-[#83B18B] text-black">
        <div className="max-w-7xl w-full mx-auto px-5 py-4 text-xl font-semibold">
          Order Successful!
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
          <h1 className="text-2xl font-semibold text-black">Thank you for shopping</h1>
          <p className="text-center text-black/80">Your order has been successfully placed and is now <br /> being processed.</p>
          <Button asChild variant={'black'}>
            <Link href={'/products'}>Go to products</Link>
          </Button>
        </article>
      </section>
    </section>
  );
};

export default Successpage;
