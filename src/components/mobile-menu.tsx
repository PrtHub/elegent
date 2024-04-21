import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <section className="md:hidden block">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-slate-700 hover:text-slate-600 transition" />
        </SheetTrigger>
        <SheetContent className="flex flex-col py-10 px-10">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/my-orders">My Orders</Link>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileMenu;
