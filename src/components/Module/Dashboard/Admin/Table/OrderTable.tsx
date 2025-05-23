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


interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Failed";
}

export default function OrderTable() {
  // const [searchTerm, setSearchTerm] = useState("");

  // Sample order data
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-05-20",
      total: 1299.99,
      items: 1,
      status: "Delivered",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-05-19",
      total: 2199.99,
      items: 1,
      status: "Processing",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-05-18",
      total: 89.99,
      items: 1,
      status: "Shipped",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-05-17",
      total: 899.99,
      items: 1,
      status: "Delivered",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-05-16",
      total: 49.99,
      items: 1,
      status: "Processing",
      paymentStatus: "Pending",
    },
    {
      id: "ORD-006",
      customer: "Sarah Brown",
      date: "2023-05-15",
      total: 1599.99,
      items: 2,
      status: "Cancelled",
      paymentStatus: "Failed",
    },
    {
      id: "ORD-007",
      customer: "David Miller",
      date: "2023-05-14",
      total: 129.99,
      items: 3,
      status: "Delivered",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-008",
      customer: "Lisa Taylor",
      date: "2023-05-13",
      total: 799.99,
      items: 1,
      status: "Shipped",
      paymentStatus: "Paid",
    },
  ];

  // const filteredProducts = products.filter(
  //   (ord) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.id.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="space-y-6">
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
              <div className="text-2xl font-bold">{orders.length}</div>
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
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "Processing").length}
              </div>
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
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "Shipped").length}
              </div>
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
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "Delivered").length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Inventory</CardTitle>
          <CardDescription>Manage your orders</CardDescription>
          <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4 mt-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">Processing</SelectItem>
                <SelectItem value="low-stock">Shipped</SelectItem>
                <SelectItem value="out-of-stock">Delivered</SelectItem>
                <SelectItem value="out-of-stock">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Items</TableHead>
                <TableHead className="hidden sm:table-cell">Total</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((product) => (
                <TableRow key={product.id} className="">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{product.customer}</div>
                    <div className="sm:hidden text-muted-foreground">
                      {product.date}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.items}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${product.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.status}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  {/* <TableCell className="flex sm:justify-end py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Edit  className="w-3.5 h-3.5 cursor-pointer" />
                              Edit
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash2 className="w-3.5 h-3.5 mr-2 cursor-pointer" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* <div className="flex items-center justify-between mt-4 px-2">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredProducts.length}</span>{" "}
          of <span className="font-medium">{products.length}</span> products
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            2
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            3
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </div> */}
    </div>
  );
}
