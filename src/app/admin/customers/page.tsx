import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import PageHeader from "../_components/page-header";
import db from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_component/user-action";

function getCustomers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

const CustomersPage = async () => {
  const customers = await getCustomers();

  return (
    <section className="pt-20 px-4 md:p-6 w-full h-svh flex flex-col items-start justify-start gap-y-10">
      <div className="w-full flex items-start justify-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Customers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="w-full flex items-center justify-between">
        <PageHeader>Customers</PageHeader>
      </section>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatNumber(user.orders.length)}</TableCell>
              <TableCell>
                {formatCurrency(
                  user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) /
                    100
                )}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropdownItem id={user.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="w-full flex items-center justify-center">
        {customers.length === 0 && (
          <p className="text-muted-foreground">No customers found</p>
        )}
      </div>
    </section>
  );
};

export default CustomersPage;
