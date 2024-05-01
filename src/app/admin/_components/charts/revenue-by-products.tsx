"use client";

import { formatCurrency } from "@/lib/formatter";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RevenueByProductProps = {
  data: {
    name: string
    revenue: number
  }[]
}

const ReveneuByProducts = ({ data }: RevenueByProductProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
       <PieChart>
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          formatter={value => formatCurrency(value as number)}
        />
        <Pie
          data={data}
          label={item => item.name}
          dataKey="revenue"
          nameKey="name"
          fill="hsl(var(--primary))"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReveneuByProducts;
