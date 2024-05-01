"use client";

import { formatCurrency } from "@/lib/formatter";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type OrdersByDayProps = {
  data: {
    date: string;
    totalSales: number;
  }[];
};

const OrdersByDayCharts = ({ data }: OrdersByDayProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="date"  fontSize={12}/>
        <YAxis tickFormatter={(tick) => formatCurrency(tick)}   fontSize={12}/>
        <Tooltip formatter={(value) => formatCurrency(value as number)} />
        <Line
          dot={false}
          type="monotone"
          dataKey="totalSales"
          name="Total sales"
          stroke="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OrdersByDayCharts;
