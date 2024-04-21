import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full h-full bg-gray-100">
      <section className="w-full max-w-6xl mx-auto h-full flex flex-col-reverse sm:flex-row items-center justify-between gap-10 px-5 py-14">
        <article className="space-y-10 text-center sm:text-start">
          <span className="space-y-2">
            <h1 className="text-2xl md:text-2xl font-semibold text-slate-950">
              Fresh Arrivals Online
            </h1>
            <p className="text-gray-600 text-sm tracking-wide">
              Discover Our Newest Collection Today.
            </p>
          </span>
          <Button>
            <Link href={"/products"} className="flex items-center">
              View Collection
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </article>
        <section className="relative ">
          <Image
            src="/ellipse.png"
            alt="ellipse"
            width={340}
            height={340}
            className="z-0 w-64 md:w-[340px]"
          />
          <figure className="absolute top-0 left-10 right-0">
            <Image
              src="/hero-image.png"
              alt="ellipse"
              width={250}
              height={360}
            className="w-44 md:w-[250px]"
            />
          </figure>
        </section>
      </section>
    </section>
  );
};

export default Hero;
