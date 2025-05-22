"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchNotFoundProps {
  searchTerm: string
}

export default function ProductNotFound({ searchTerm }: SearchNotFoundProps) {
  const [searchQuery, setSearchQuery] = useState(searchTerm || "")

  // Popular categories
  const popularCategories = [
    { name: "Mountain Bikes", slug: "mountain-bikes" },
    { name: "Road Bikes", slug: "road-bikes" },
    { name: "Hybrid Bikes", slug: "hybrid-bikes" },
    { name: "Helmets", slug: "helmets" },
    { name: "Accessories", slug: "accessories" },
    { name: "Clothing", slug: "clothing" },
    { name: "Parts", slug: "parts" },
    { name: "Tools", slug: "tools" },
  ]

  // Popular search terms
  const popularSearches = ["bike", "helmet", "light", "lock", "water bottle", "repair kit", "gloves", "jersey"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
          <Search className="h-10 w-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">No Results Found</h1>
        <p className="text-xl text-muted-foreground mb-2">
          We couldn&apos;t find any results for <span className="font-medium">&quot;{searchTerm}&quot;</span>
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Try checking your spelling or using more general terms.
        </p>
      </motion.div>

      <div className="max-w-xl mx-auto mb-12">
        <motion.form
          onSubmit={handleSearch}
          className="flex gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            type="search"
            placeholder="Try another search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="gradient-bg gradient-bg-hover">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </motion.form>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category) => (
                <Link key={category.slug} href={`/products/category/${category.slug}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Tag className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    {term}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-12 p-6 border rounded-lg bg-muted/50 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Need Help Finding Something?</h2>
        <p className="mb-4">Our customer service team is here to help you find exactly what you&apos;re looking for.</p>
        <Link href="/contact">
          <Button className="gradient-bg gradient-bg-hover">Contact Support</Button>
        </Link>
      </motion.div>
    </div>
  )
}
