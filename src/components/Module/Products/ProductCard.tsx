"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "../Providers/CartProvider"
import { TProduct } from "@/types"



export default function ProductCard({ product }: { product: TProduct }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
   alert("Item added to wishlist!")
  }


  const handleAddToCart = () => {
    addToCart({
      _id: product._id!,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
      <div className="flex flex-col h-full overflow-hidden border rounded-lg">
        <div className="relative">
          <Link href={`/products/${product._id}`}>
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src={
                  product?.imageUrl?.replace(
                  "http://",
                  "https://"
                ) || "/placeholder.svg"
              }
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>

          <div className="absolute flex flex-col gap-2 top-2 left-2">
            {/* {product.isNew && <Badge className="bg-teal-500">New</Badge>}
            {product.isSale && <Badge className="text-white bg-coral">Sale</Badge>} */}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={toggleWishlist}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <div className="mb-1 text-sm text-muted-foreground">{product?.type}</div>
          <Link href={`/products/${product._id}`}>
            <h3 className="mb-1 text-lg font-semibold transition-colors hover:text-teal-500">{product.name}</h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-amber text-amber" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            {/* <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span> */}
          </div>

          <div className="flex items-center mt-auto">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.price && (
              <span className="ml-2 text-sm line-through text-muted-foreground">
                ${product.price.toFixed(2)}
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
  )
}
