import Image from "next/image";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 w-full">
      <Separator />
      <section className="max-w-6xl mx-auto flex sm:flex-row flex-col gap-5 justify-between items-center mt-10">
        <span className="flex items-center gap-2 justify-center">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <h1 className="text-slate-950 font-semibold text-lg sm:text-xl">
            Elegant
          </h1>
        </span>
        <span className="text-gray-500 text-sm tracking-wide">© 2024 Pritam Ghosh. All rights reserved.</span>
      </section>
    </footer>
  );
};

export default Footer;
