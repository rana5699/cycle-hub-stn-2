"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TUser, TUserResponse } from "@/types/user.types";

export default function CustomersTable({
  customers,
}: {
  customers: TUserResponse;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  //   const filteredCustomers = customers.filter(
  //     (customer) =>
  //       customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       customer.id.toLowerCase().includes(searchTerm.toLowerCase()),
  //   )
  return (
    <div className="">
      <div className="">
        <motion.h1
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Customers Management
        </motion.h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardDescription>Manage your Customers</CardDescription>
          <div className="  gap-4 mt-4">
            <div className="relative ">
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
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>

                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.result?.map((customer: TUser) => (
                <TableRow key={customer?._id} className="text-sm">
                  <TableCell>{customer?.name}</TableCell>
                  <TableCell>
                    <div className="font-medium">{customer?.email}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer?.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer?.isActive ? "Active" : "Inactive"}
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
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Pencil className="w-3.5 h-3.5 cursor-pointer" />
                            Block
                          </div>
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
