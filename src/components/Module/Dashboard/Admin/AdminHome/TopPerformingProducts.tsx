"use client";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const TopPerformingProducts = () => {
  const topProducts = [
    { name: "Mountain Bike Pro X1", sales: 156, revenue: 187200, growth: 12.5 },
    {
      name: "Road Bike Elite Carbon",
      sales: 134,
      revenue: 268000,
      growth: 8.3,
    },
    { name: "Hybrid City Cruiser", sales: 98, revenue: 78400, growth: -2.1 },
    { name: "Professional Helmet", sales: 245, revenue: 24500, growth: 15.7 },
    { name: "Carbon Fiber Wheels", sales: 67, revenue: 40200, growth: 22.1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle  className="text-3xl font-bold">Top Performing Products</CardTitle>
          <CardDescription>
            Best selling products by revenue and units sold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.sales} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <div
                    className={`flex items-center text-xs ${
                      product.growth > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.growth > 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(product.growth)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopPerformingProducts;
