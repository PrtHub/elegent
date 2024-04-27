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
import SearchInput from "./search-input";

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
            <Link href="/orders" legacyBehavior passHref>
              <NavigationMenuLink className="text-slate-500 text-sm font-medium">
                My Orders
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <section className="flex items-center gap-x-2">
        <div className="sm:block hidden">
          <SearchInput />
        </div>
        <MobileMenu />
      </section>
    </nav>
  );
};

export default Navbar;
