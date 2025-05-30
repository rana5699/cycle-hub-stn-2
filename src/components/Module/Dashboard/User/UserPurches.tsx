"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Download,
  Eye,
  Filter,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { getActiveUser } from "@/utils/getAvtiveUser";
import { getOrdersByUser } from "@/actions/Order";
import { TOrder, TUserPurchase } from "@/types";
import TableSkeleton from "@/components/Shared/Skeleton/TableSkeleton";

export default function PurchaseHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  //   const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<TUserPurchase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  //   const ordersPerPage = 5;
  const user = getActiveUser();

  //   console.log(user);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      if (!user?.userId) return;

      try {
        const history = await getOrdersByUser(user.userId);
        setOrders(history?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch order history:", error);
      }
    };

    fetchOrders();
  }, [searchTerm, statusFilter, user?.userId]);

if (loading) {
  return (
    <TableSkeleton />
  );
}


  const getStatusColor = (status: TOrder["orderIntent"]) => {
    switch (status) {
      case "Delivered":
        return "text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue";
      case "Confirmed":
        return "text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container py-12">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Purchase History</h1>
          <p className="text-muted-foreground">
            View and manage your order history
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      All Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("processing")}
                    >
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("shipped")}
                    >
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("delivered")}
                    >
                      Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("cancelled")}
                    >
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                  className="w-full sm:w-auto"
                >
                  {sortDirection === "asc" ? (
                    <ArrowUp className="mr-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="mr-2 h-4 w-4" />
                  )}
                  Date
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.allOrders?.length !== 0 ? (
                    orders?.allOrders?.map((order: TOrder, i) => (
                      <motion.tr
                        key={order?._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                        className="[&_td]:py-4"
                      >
                        <TableCell className="font-medium">
                          {order?.transactionInfo?.transactionId ||
                            order?._id ||
                            "N/A"}
                        </TableCell>
                        <TableCell>
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order?.products?.slice(0, 2).map((item, index) => (
                              <div key={index} className="text-sm">
                                {item?.basicInfo?.name} x
                                {item?.basicInfo?.quantity}
                              </div>
                            ))}
                            {order?.products?.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{order?.products?.length - 2} more items
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>${order?.totalPrice?.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(order?.orderIntent)}`}
                          >
                            {order?.orderIntent}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Link href={`/products/${order._id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only md:not-sr-only md:ml-2">
                                  View
                                </span>
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Search className="h-8 w-8 mb-2" />
                          <p className="text-lg font-medium">No orders found</p>
                          <p className="text-sm">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {/* {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstOrder + 1}-
                  {indexOfLastOrder > filteredOrders.length
                    ? filteredOrders.length
                    : indexOfLastOrder}{" "}
                  of {filteredOrders.length} orders
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                  </Button>
                  <div className="flex items-center">
                    <Select
                      value={currentPage.toString()}
                      onValueChange={(value) =>
                        setCurrentPage(Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder={currentPage} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="mx-2 text-muted-foreground">
                      of {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                  </Button>
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
