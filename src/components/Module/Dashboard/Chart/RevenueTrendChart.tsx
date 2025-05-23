"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const RevenueTrendChart = () => {
  // Sample analytics data
  const revenueData = [
    { date: "2024-01-01", revenue: 12000, orders: 45, customers: 32 },
    { date: "2024-01-02", revenue: 15000, orders: 52, customers: 38 },
    { date: "2024-01-03", revenue: 18000, orders: 61, customers: 45 },
    { date: "2024-01-04", revenue: 14000, orders: 48, customers: 35 },
    { date: "2024-01-05", revenue: 22000, orders: 73, customers: 52 },
    { date: "2024-01-06", revenue: 19000, orders: 65, customers: 48 },
    { date: "2024-01-07", revenue: 25000, orders: 82, customers: 61 },
  ];
  return (
    <motion.div
      className="text-3xl font-bold gradient-text"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>
            Daily revenue, orders, and customer acquisition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
              orders: { label: "Orders", color: "hsl(var(--chart-2))" },
              customers: {
                label: "New Customers",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="var(--color-revenue)"
                  fill="var(--color-revenue)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueTrendChart;
