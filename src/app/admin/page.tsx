import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

import Link from "next/link";
import OrdersByDayCharts from "./_components/charts/orders-by-day";
import { Prisma } from "@prisma/client";
import { eachDayOfInterval, interval, startOfDay, subDays } from "date-fns";
import CustomersByDayCharts from "./_components/charts/customers-by-day";
import ReveneuByProducts from "./_components/charts/revenue-by-products";
import { ChartCard } from "./_components/chart-card";
import { RANGE_OPTIONS, getRangeOptions } from "@/lib/range-options";

async function getSalesData(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [data, chartData] = await Promise.all([
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
      _count: true,
    }),

    db.order.findMany({
      select: { createdAt: true, pricePaidInCents: true },
      where: { createdAt: createdAtQuery },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const dayArray = eachDayOfInterval(
    interval(
      createdAfter || startOfDay(chartData[0].createdAt),
      createdBefore || new Date()
    )
  ).map((date) => {
    return {
      date: formatDate(date),
      totalSales: 0,
    };
  });

  return {
    chartData: chartData.reduce((data, order) => {
      const formattedDate = formatDate(order.createdAt);
      const entry = dayArray.find((day) => day.date === formattedDate);
      if (entry == null) return data;
      entry.totalSales += order.pricePaidInCents / 100;
      return data;
    }, dayArray),
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  const createdAtQuery: Prisma.UserWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [userCount, orderData, chartData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
    db.user.findMany({
      select: { createdAt: true },
      where: { createdAt: createdAtQuery },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const dayArray = eachDayOfInterval(
    interval(
      createdAfter || startOfDay(chartData[0].createdAt),
      createdBefore || new Date()
    )
  ).map((date) => {
    return {
      date: formatDate(date),
      totalUsers: 0,
    };
  });

  return {
    chartData: chartData.reduce((data, user) => {
      const formattedDate = formatDate(user.createdAt);
      const entry = dayArray.find((day) => day.date === formattedDate);
      if (entry == null) return data;
      entry.totalUsers += 1;
      return data;
    }, dayArray),
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [activeCount, inactiveCount, chartData] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
    db.product.findMany({
      select: {
        name: true,
        orders: {
          where: {
            createdAt: createdAtQuery,
          },
          select: { pricePaidInCents: true },
        },
      },
    }),
  ]);

  return {
    chartData: chartData
      .map((product) => {
        return {
          name: product.name,
          revenue: product.orders.reduce((acc, product) => {
            return acc + product.pricePaidInCents / 100;
          }, 0),
        };
      })
      .filter((product) => product.revenue > 0),
    activeCount,
    inactiveCount,
  };
}

const AdminPage = async ({
  searchParams: {
    totalSales,
    totalSalesFrom,
    totalSalesTo,
    totalCustomers,
    totalCustomersFrom,
    totalCustomersTo,
    totalRevenue,
    totalRevenueFrom,
    totalRevenueTo,
  },
}: {
  searchParams: {
    totalSales: string;
    totalSalesFrom: string;
    totalSalesTo: string;
    totalCustomers: string;
    totalCustomersFrom: string;
    totalCustomersTo: string;
    totalRevenue: string;
    totalRevenueFrom: string;
    totalRevenueTo: string;
  };
}) => {
  const totalSalesRangeOption =
    getRangeOptions(totalSales, totalSalesFrom, totalSalesTo) ||
    RANGE_OPTIONS.last_7_days;
  const totalCustomersRangeOption =
    getRangeOptions(totalCustomers, totalCustomersFrom, totalCustomersTo) ||
    RANGE_OPTIONS.last_7_days;
  const totalRevenueRangeOption =
    getRangeOptions(totalRevenue, totalRevenueFrom, totalRevenueTo) ||
    RANGE_OPTIONS.last_7_days;

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(
      totalSalesRangeOption.startDate,
      totalSalesRangeOption.endDate
    ),
    getUserData(
      totalCustomersRangeOption.startDate,
      totalCustomersRangeOption.endDate
    ),
    getProductData(
      totalRevenueRangeOption.startDate,
      totalRevenueRangeOption.endDate
    ),
  ]);
  return (
    <section className="pt-20 px-4 md:p-6 w-full h-svh flex flex-col items-start justify-start gap-y-10 md:gap-y-20">
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
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Sales"
          subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
          body={formatCurrency(salesData.amount)}
        />
        <DashboardCard
          title="Customers"
          subtitle={`${formatNumber(
            userData.averageValuePerUser
          )} Average value`}
          body={formatNumber(userData.userCount)}
        />
        <DashboardCard
          title="Active Products"
          subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
          body={formatNumber(productData.activeCount)}
        />
      </section>

      <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Total Sales"
          queryKey="totalSales"
          selectedRangeLabel={totalSalesRangeOption.label}
        >
          <OrdersByDayCharts data={salesData.chartData} />
        </ChartCard>
        <ChartCard
          title="Total Customers"
          queryKey="totalCustomers"
          selectedRangeLabel={totalCustomersRangeOption.label}
        >
          <CustomersByDayCharts data={userData.chartData} />
        </ChartCard>
        <ChartCard
          title="Total Revenue"
          queryKey="totalRevenue"
          selectedRangeLabel={totalRevenueRangeOption.label}
        >
          <ReveneuByProducts data={productData.chartData} />
        </ChartCard>
      </section>
    </section>
  );
};

export default AdminPage;

interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};
