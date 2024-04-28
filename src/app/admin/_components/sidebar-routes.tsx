"use client";

import { IconBadge } from "@/components/icon-badge";
import { cn } from "@/lib/utils";
import {
  BadgeDollarSign,
  BadgePercent,
  LayoutDashboard,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: Store,
    label: "Products",
    path: "/admin/products",
  },
  {
    icon: Users,
    label: "Customers",
    path: "/admin/customers",
  },
  {
    icon: BadgeDollarSign,
    label: "Sales",
    path: "/admin/sales",
  },
  {
    icon: BadgePercent,
    label: "Coupons",
    path: "/admin/coupons",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  return (
    <section className="w-full flex flex-col items-center justify-center">
      {routes.map((route) => (
        <Link
          href={route.path}
          key={route.label}
          className={cn(
            "w-full pl-16 py-6 flex items-center justify-start gap-x-2 text-gray-500",
            pathname === route.path && 'text-gray-900 bg-gray-100'
          )}
        >
          <IconBadge icon={route.icon} size="md" />
          <p className="">{route.label}</p>
        </Link>
      ))}
    </section>
  );
};

//text-[#5C5F6A]

export default SidebarRoutes;
