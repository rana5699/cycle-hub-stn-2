"use client";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOrder, TOrderResponse } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Shared/Pagination";
import { useMemo, useState } from "react";
import { confirmOrder, rejectOrder } from "@/actions/Order";
import { useToast } from "@/hooks/use-toast";

export default function OrderTable({ orders }: { orders: TOrderResponse }) {
  const { toast } = useToast()
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    if (filterStatus === "all") return orders?.result || [];
    return orders?.result?.filter(
      (order) => order?.orderIntent === filterStatus
    );
  }, [orders?.result, filterStatus]);

  const pendingCount = orders?.result?.filter(
    (o) => o?.orderIntent === "Pending"
  )?.length;
  const deliveredCount = orders?.result?.filter(
    (o) => o?.orderIntent === "Delivered"
  )?.length;
  const confirmCount = orders?.result?.filter(
    (o) => o?.orderIntent === "Confirmed"
  ).length;

  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    const updatedOrders = orders?.result?.map((order) => {
      if (order._id === orderId) {
        return { ...order, orderIntent: newStatus };
      }
      return order;
    });

    // console.log(newStatus," Updated Orders");

    if (newStatus === "Confirmed") {
      // Handle Confirm logic here
      const res = await confirmOrder(orderId);
      if (res?.success) {
        toast({
          description: "Order confirmed successfully!",
          variant: "default",
        })
      } else {
        toast({
          description: "Failed to confirm order.",
          variant: "destructive",
        })
      }
    }
    if (newStatus === "Rejected") {
      const res = await rejectOrder(orderId);
      if (res?.success) {
        toast({
          description: "Order rejected successfully!",
          variant: "default",
        });
      } else {
        toast({
          description: "Failed to reject order.",
          variant: "destructive",
        });
      }
    }

    return updatedOrders;
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h1
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Order Management
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          custom={0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.result?.length || 0}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={3}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Confirm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmCount}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Inventory</CardTitle>
          <CardDescription>Manage your orders</CardDescription>
          <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4 mt-4">
            <Select
              defaultValue="all"
              onValueChange={(value) => setFilterStatus(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Confirm">Confirm</SelectItem>
                <SelectItem value="Reject">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Items</TableHead>
                <TableHead className="hidden sm:table-cell">Total</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.length === 0 ? (
                <div className="mx-auto mt-5 w-full flex items-center justify-center">
                  No orders found
                </div>
              ) : (
                filteredOrders?.map((product: TOrder) => (
                  <TableRow key={product?._id} className="">
                    <TableCell>{product?._id}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {/* {product?.userId}
                         */}
                        Unknown User
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {new Date(product?.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {product?.products?.length} Items
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      ${product?.totalPrice?.toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product?.orderIntent === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : product?.orderIntent === "Delivered"
                            ? "bg-blue-100 text-blue-800"
                            : product?.orderIntent === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : product?.orderIntent === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product?.orderIntent}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-sm capitalize"
                          >
                            {product?.orderIntent}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {(product.orderIntent === "Pending"
                            ? ["Confirmed", "Delivered", "Rejected"]
                            : product.orderIntent === "Confirmed"
                            ? ["Delivered"]
                            : product.orderIntent === "Rejected"
                            ? ["Confirm", "Delivered"]
                            : []
                          ) // For Delivered or unknown statuses, no further actions
                            .map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() =>
                                  handleOrderStatusChange(product._id, status)
                                }
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination meta={orders?.meta} />
    </div>
  );
}
