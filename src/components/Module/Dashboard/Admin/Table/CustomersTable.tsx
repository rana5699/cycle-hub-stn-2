"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Customer {
  id: string
  name: string
  email: string
  orders: number
  spent: number
  lastOrder: string
  status: "Active" | "Inactive"
}

export default function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample customer data
  const customers: Customer[] = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john.doe@example.com",
      orders: 5,
      spent: 2500,
      lastOrder: "2023-05-15",
      status: "Active",
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      orders: 3,
      spent: 1200,
      lastOrder: "2023-05-10",
      status: "Active",
    },
    {
      id: "CUST-003",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      orders: 1,
      spent: 90,
      lastOrder: "2023-04-28",
      status: "Active",
    },
    {
      id: "CUST-004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      orders: 2,
      spent: 950,
      lastOrder: "2023-05-05",
      status: "Active",
    },
    {
      id: "CUST-005",
      name: "Michael Wilson",
      email: "michael.w@example.com",
      orders: 4,
      spent: 1800,
      lastOrder: "2023-05-12",
      status: "Active",
    },
    {
      id: "CUST-006",
      name: "Sarah Brown",
      email: "sarah.b@example.com",
      orders: 0,
      spent: 0,
      lastOrder: "N/A",
      status: "Inactive",
    },
    {
      id: "CUST-007",
      name: "David Miller",
      email: "david.m@example.com",
      orders: 6,
      spent: 3200,
      lastOrder: "2023-05-18",
      status: "Active",
    },
    {
      id: "CUST-008",
      name: "Lisa Taylor",
      email: "lisa.t@example.com",
      orders: 2,
      spent: 600,
      lastOrder: "2023-04-20",
      status: "Inactive",
    },
  ]

//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.id.toLowerCase().includes(searchTerm.toLowerCase()),
//   )
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h1
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Customers Management
        </motion.h1>
      </div>

      <Card>
        <CardHeader>
          <CardDescription>Manage your Customers</CardDescription>
          <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4 mt-4">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="w-10/12">
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
            
                <TableHead className="hidden sm:table-cell">Total Spend</TableHead>
                <TableHead className="hidden sm:table-cell">Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((product:Customer) => (
                <TableRow key={product.id} className="text-sm">
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <div className="font-medium">{product.email}</div>
                  
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${product.spent}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.lastOrder}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex sm:justify-end py-4">
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
                              <Pencil  className="w-3.5 h-3.5 cursor-pointer" />
                              Block
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash2 className="w-3.5 h-3.5 mr-2 cursor-pointer" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
