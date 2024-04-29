import db from "@/lib/db";
import Link from "next/link";
import {
  CheckCircle2,
  Globe,
  Infinity,
  Minus,
  MoreVertical,
  XCircle,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatCurrency,
  formatDateTime,
  formatDiscountCode,
  formatNumber,
} from "@/lib/formatter";
import PageHeader from "../_components/page-header";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/discountCode-actions";

const WHERE_EXPIRED: Prisma.DiscountCodeWhereInput = {
  OR: [
    { limit: { not: null, lte: db.discountCode.fields.uses } },
    { expiresAt: { not: null, lte: new Date() } },
  ],
};

const SELETE_FIELDS: Prisma.DiscountCodeSelect = {
  id: true,
  allProducts: true,
  code: true,
  discountAmount: true,
  discountType: true,
  expiresAt: true,
  limit: true,
  uses: true,
  isActive: true,
  products: { select: { name: true } },
  _count: { select: { orders: true } },
};

function getExpiredDiscountCode() {
  return db.discountCode.findMany({
    select: SELETE_FIELDS,
    where: WHERE_EXPIRED,
    orderBy: { createdAt: "asc" },
  });
}

function getUnExpiredDiscountCode() {
  return db.discountCode.findMany({
    select: SELETE_FIELDS,
    where: { NOT: WHERE_EXPIRED },
    orderBy: { createdAt: "asc" },
  });
}

const CouponPage = async () => {
  const [expiredDiscountCodes, unExpiredDiscountCodes] = await Promise.all([
    getExpiredDiscountCode(),
    getUnExpiredDiscountCode(),
  ]);
  return (
    <>
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
                <BreadcrumbPage>Coupons</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className="w-full flex items-center justify-between">
          <PageHeader>Coupons</PageHeader>
          <Button asChild variant={"black"}>
            <Link href="/admin/coupons/new">Add Coupon</Link>
          </Button>
        </section>
        <DiscountCodeTable
          discountCodes={unExpiredDiscountCodes}
          canDeactivate
        />
         <div className="w-full flex items-center justify-center">
          {unExpiredDiscountCodes.length === 0 && (
            <p className="text-muted-foreground">No coupons</p>
          )}
        </div>

        <section className="mt-8">
          <h2 className="font-semibold text-xl">Expired coupons</h2>
        </section>
        <DiscountCodeTable discountCodes={expiredDiscountCodes} isInactive />
        <div className="w-full flex items-center justify-center">
          {expiredDiscountCodes.length === 0 && (
            <p className="text-muted-foreground">No expired coupons</p>
          )}
        </div>
      </section>
    </>
  );
};

export default CouponPage;

type DiscountCodeTableProps = {
  discountCodes: Awaited<ReturnType<typeof getUnExpiredDiscountCode>>;
  isInactive?: boolean;
  canDeactivate?: boolean;
};

function DiscountCodeTable({
  discountCodes,
  isInactive = false,
  canDeactivate = false,
}: DiscountCodeTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Is Active</span>
          </TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead>Remain Uses</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Products</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discountCodes.map((discountCode) => (
          <TableRow key={discountCode.id}>
            <TableCell>
              {discountCode.isActive && !isInactive ? (
                <>
                  <span className="sr-only">Active</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Inactive</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>{discountCode.code}</TableCell>
            <TableCell>{formatDiscountCode(discountCode)}</TableCell>
            <TableCell>
              {discountCode.expiresAt == null ? (
                <Minus />
              ) : (
                formatDateTime(discountCode.expiresAt)
              )}
            </TableCell>
            <TableCell>
              {discountCode.limit == null ? (
                <Infinity />
              ) : (
                formatNumber(discountCode.limit - discountCode.uses)
              )}
            </TableCell>
            <TableCell>{discountCode._count.orders}</TableCell>
            <TableCell>
              {discountCode.allProducts ? (
                <Globe />
              ) : (
                discountCode.products.map((product) => product.name).join(", ")
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {canDeactivate && (
                    <ActiveToggleDropdownItem
                      id={discountCode.id}
                      isActive={discountCode.isActive}
                    />
                  )}
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={discountCode.id}
                    disabled={discountCode._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
