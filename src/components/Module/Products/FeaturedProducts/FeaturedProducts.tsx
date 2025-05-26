"use client";

import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import { TNewProduct } from "@/types";

export default function FeaturedProducts({
  products,
}: {
  products: TNewProduct[];
}) {


  return (
    <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
      {products?.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
         <ProductCard product={product}/>
        </motion.div>
      ))}
    </div>
  );
}
