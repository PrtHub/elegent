import { Award, ShieldCheck, Truck } from "lucide-react";

const Features = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-5 h-full py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
      <article className="flex flex-col items-start gap-y-2">
        <Truck />
        <h1 className="text-slate-950 font-semibold text-base mt-2 tracking-wide">
          Free Shipping
        </h1>
        <p className="text-gray-500 sm:max-w-[250px] text-xs tracking-wide leading-5">
          Upgrade your style today and get FREE shipping on all orders!
          Don&apos;t miss out.
        </p>
      </article>
      <article className="flex flex-col items-start gap-y-2">
        <Award />
        <h1 className="text-slate-950 font-semibold text-base mt-2 tracking-wide">
          Satisfaction Guarantee
        </h1>
        <p className="text-gray-500 sm:max-w-[250px] text-xs tracking-wide leading-5">
          Shop confidently with our Satisfaction Guarantee: Love it or get a
          refund.
        </p>
      </article>
      <article className="flex flex-col items-start gap-y-2">
        <ShieldCheck />
        <h1 className="text-slate-950 font-semibold text-base mt-2 tracking-wide">
          Secure Payment
        </h1>
        <p className="text-gray-500 sm:max-w-[250px] text-xs tracking-wide leading-5">
          Your security is our priority. Your payments are secure with us.
        </p>
      </article>
    </section>
  );
};

export default Features;
