import Image from "next/image";
import SidebarRoutes from "./sidebar-routes";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <section className="w-full h-full bg-white border-2 flex flex-col items-start justify-start">
      <Image
        src="/admin.png"
        alt="admin logo"
        width={160}
        height={130}
        className="p-6 ml-10 md:ml-9"
      />
      <Separator />
      <div className="w-full flex items-center justify-center">
        <SidebarRoutes />
      </div>
      <div className="w-full h-full flex items-end justify-center py-5 pr-16">
      <Link
        href={"/"}
        className="flex items-center justify-center gap-x-1 text-gray-500 hover:text-gray-800 transition"
        >
        <LogOut className="w-5 h-5" /> Exit
      </Link>
        </div>
    </section>
  );
};

export default Sidebar;
