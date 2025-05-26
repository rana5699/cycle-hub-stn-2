"use client";

import type React from "react";

import { motion } from "framer-motion";

interface ProductNotFoundProps {
  productId?: string;
  searchTerm?: string;
  backUrl?: string;
}

export default function ProductNotFound({
  productId,
  searchTerm,
}: ProductNotFoundProps) {
  return (
    <div className="container py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Product Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          {productId
            ? `We couldn't find the product with ID: ${productId}`
            : searchTerm
            ? `No results found for "${searchTerm}"`
            : "The product you're looking for doesn't seem to exist."}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The product may have been removed, renamed, or is temporarily
          unavailable.
        </p>
      </motion.div>
    </div>
  );
}
