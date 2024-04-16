import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import Sidebar from "./sidebar";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <nav className="w-full h-full flex items-center justify-between bg-white border-b px-3">
      <Sheet>
        <SheetTrigger className="hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <Link href={"/"} className="flex items-center justify-center gap-x-1 hover:opacity-90 transition">
        <LogOut className="w-5 h-5"/> Exit
      </Link>
    </nav>
  );
};

export default MobileNavbar;
