"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Home, Search, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ProductNotFoundProps {
  productId?: string
  searchTerm?: string
  backUrl?: string
}

export default function ProductNotFound({ productId, searchTerm, backUrl = "/products" }: ProductNotFoundProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  // Sample recommended products
  const recommendedProducts = [
    {
      id: "prod-1",
      name: "Mountain Bike Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "prod-2",
      name: "Road Bike Elite",
      price: 2199.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "prod-3",
      name: "Cycling Helmet",
      price: 89.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "prod-4",
      name: "Bike Repair Kit",
      price: 49.99,
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="container py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image src="/placeholder.svg?height=200&width=200" alt="Product not found" fill className="object-contain" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-red-500">?</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Product Not Found</h1>
        <p className="text-xl text-muted-foreground mb-2">
          {productId
            ? `We couldn't find the product with ID: ${productId}`
            : searchTerm
              ? `No results found for "${searchTerm}"`
              : "The product you're looking for doesn't seem to exist."}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The product may have been removed, renamed, or is temporarily unavailable.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-xl mx-auto mb-12">
        <motion.div variants={itemVariants} className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="gradient-bg gradient-bg-hover">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
          <Link href={backUrl}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse All Products
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">You might be interested in</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 flex items-center justify-center bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-32 w-32 object-contain"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="ghost">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
