"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
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

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export default function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample product data
  const products: Product[] = [
    {
      id: "PROD-001",
      name: "Mountain Bike Pro",
      category: "Mountain Bikes",
      price: 1299.99,
      stock: 15,
      status: "In Stock",
    },
    {
      id: "PROD-002",
      name: "Road Bike Elite",
      category: "Road Bikes",
      price: 2199.99,
      stock: 8,
      status: "In Stock",
    },
    {
      id: "PROD-003",
      name: "Hybrid Bike Comfort",
      category: "Hybrid Bikes",
      price: 899.99,
      stock: 12,
      status: "In Stock",
    },
    {
      id: "PROD-004",
      name: "Cycling Helmet",
      category: "Accessories",
      price: 89.99,
      stock: 25,
      status: "In Stock",
    },
    {
      id: "PROD-005",
      name: "Bike Repair Kit",
      category: "Parts",
      price: 49.99,
      stock: 30,
      status: "In Stock",
    },
    {
      id: "PROD-006",
      name: "Mountain Bike Beginner",
      category: "Mountain Bikes",
      price: 799.99,
      stock: 3,
      status: "Low Stock",
    },
    {
      id: "PROD-007",
      name: "Road Bike Standard",
      category: "Road Bikes",
      price: 1499.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "PROD-008",
      name: "Water Bottle",
      category: "Accessories",
      price: 12.99,
      stock: 50,
      status: "In Stock",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h1
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Products Management
        </motion.h1>
        <div>
          <Link href="/admin/products/new-product">
            {" "}
            <Button className="gradient-bg gradient-bg-hover w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your product catalog</CardDescription>
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
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="mountain">Mountain Bikes</SelectItem>
                <SelectItem value="road">Road Bikes</SelectItem>
                <SelectItem value="hybrid">Hybrid Bikes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="parts">Parts</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
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
                <TableRow key={product.id} className="text-sm">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="sm:hidden text-xs text-muted-foreground">
                      {product.category}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
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
                              <Edit className="w-3.5 h-3.5 cursor-pointer" />
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
      </div>
    </div>
  );
}
