"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BicycleCategory, TNewProduct } from "@/types";
import { deleteProduct } from "@/actions/ptoducts";

export default function ProductsTable({
  products,
}: {
  products: TNewProduct[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product?.basicInfo?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product?.basicInfo?.category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product?.basicInfo?.brand
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product?.basicInfo?.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteProduct(id);
      if (response?.success) {
        // Optionally, you can show a success message or refresh the product list
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h1
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Products Management
        </motion.h1>
        <Link href="/dashboard/admin/products/new-product">
          <Button className="gradient-bg gradient-bg-hover w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your product catalog</CardDescription>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4 mt-4">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>

            {/* Category Filter */}
            <Select
              defaultValue="all"
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.values(BicycleCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent className="overflow-x-auto">
          <Table className="w-10/12">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Price</TableHead>
                <TableHead className="hidden sm:table-cell">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product?._id} className="text-sm">
                  <TableCell>{product?._id}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {product?.basicInfo?.name}
                    </div>
                    <div className="sm:hidden text-xs text-muted-foreground">
                      {product?.basicInfo?.category}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product?.basicInfo?.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${product?.basicInfo?.price?.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product?.basicInfo?.quantity || 0}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product?.basicInfo?.status === "active"
                          ? "bg-green-100 text-green-700"
                          : product?.basicInfo?.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product?.basicInfo?.status}
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
                          <Link href={`/dashboard/admin/products/${product?._id}`}>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteProduct(product._id as string)
                          }
                          className="text-red-600 focus:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-2" />
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

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 px-2">
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
        </div>
      </div>
    </div>
  );
}
