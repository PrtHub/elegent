"use client";

import { formatNumber } from "@/lib/formatter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CustomersByDayProps = {
  data: {
    date: string;
    totalUsers: number;
  }[];
};

const CustomersByDayCharts = ({ data }: CustomersByDayProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="date" fontSize={12} />
        <YAxis tickFormatter={(tick) => formatNumber(tick)} fontSize={12} />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          formatter={(value) => formatNumber(value as number)}
        />
        <Bar
          dataKey="totalUsers"
          name="Total Customers"
          stroke="hsl(var(--primary))"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomersByDayCharts;
