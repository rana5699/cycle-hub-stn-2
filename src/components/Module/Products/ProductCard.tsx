"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../Providers/CartProvider";
import { TNewProduct } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: TNewProduct }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();


  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  const handleAddToCart = () => {
    addToCart({
      _id: product._id!,
      name: product?.basicInfo?.name,
      price: product?.basicInfo?.price,
      imageUrl: product?.images?.[0] || "/placeholder.svg",
      quantity: 1,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <div className="flex flex-col h-full overflow-hidden border rounded-lg">
        <div className="relative">
          <Link href={`/products/${product?._id}`}>
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src={
                  product?.images?.[0]?.replace("http://", "https://") ||
                  "/placeholder.svg"
                }
                alt={product?.basicInfo?.name || "Product Image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105"
                priority={false}
              />
            </div>
          </Link>

          <div className="absolute flex flex-col gap-2 top-2 left-2">
           {product?.basicInfo?.tags.slice(0, 1).map((tag, idx) => (
              <Badge
                key={idx}
              className="text-white bg-gradient-to-r from-navy-blue to-teal-500 "
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Badge>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={toggleWishlist}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <div className="mb-1 text-sm text-muted-foreground">
            {product?.basicInfo?.category}
          </div>
          <Link href={`/products/${product?._id}`}>
            <h3 className="mb-1 text-lg font-semibold transition-colors hover:text-teal-500">
              {product?.basicInfo?.name}
            </h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(3)
                      ? "fill-amber text-amber"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            {/* <span className="ml-1 text-xs text-muted-foreground">({product?.reviews})</span> */}
          </div>

          <div className="flex items-center mt-auto">
            <span className="text-lg font-bold">
              ${product?.basicInfo?.price?.toFixed(2)}
            </span>
            {product?.basicInfo?.price && (
              <span className="ml-2 text-sm line-through text-muted-foreground">
                ${product?.basicInfo?.price?.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            className="w-full mt-4 text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
