"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <nav className="w-full max-w-7xl mx-auto h-full flex items-center justify-between gap-x-10 px-5 py-3">
      <span className="flex items-center gap-2 justify-center">
        <Image src="/logo.png" alt="logo" width={30} height={30} />
        <h1 className="text-slate-950 font-semibold text-lg sm:text-xl">
          Elegant
        </h1>
      </span>

      <NavigationMenu className="md:block hidden">
        <NavigationMenuList className="space-x-8">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-slate-500 text-sm font-medium">
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink className="text-slate-500 text-sm font-medium">
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/my-orders" legacyBehavior passHref>
              <NavigationMenuLink className="text-slate-500 text-sm font-medium">
                My Orders
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <section className="flex items-center gap-x-2">
        <div className="sm:block hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Products"
              className="focus-visible:outline-none focus-visible:ring-0 rounded-md text-slate-500 pl-10 "
            />
            <Search className="absolute left-3 top-3 bottom-0 w-4 h-4 text-slate-500 hover:opacity-90 transition" />
          </div>
        </div>

        <MobileMenu />
      </section>
    </nav>
  );
};

export default Navbar;
