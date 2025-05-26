"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../Providers/CartProvider";

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cartItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <ShoppingCart className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="mb-2 text-2xl font-bold">Your cart is empty</h3>
        <p className="mb-6 text-muted-foreground">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link href="/products">
          <Button className="text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  // get total price of cart items
  // const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  // const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-bold">Your Cart ({cartItems?.length})</h2>
      </div>

      <Separator />

      <div className="flex-1 py-4 overflow-y-auto">
        <AnimatePresence>
          {cartItems?.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-4 py-4 border-b"
            >
              <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                <Image
                  src={
                    item?.imageUrl?.replace("http://", "https://") ||
                    "/placeholder.svg?height=80&width=80"
                  }
                  alt={item?.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item?.name}</h3>
                <p className="text-lg font-bold">${item?.price?.toFixed(2)}</p>

                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() =>
                      updateQuantity(item?._id, item?.quantity - 1)
                    }
                    disabled={item?.quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 mx-2 text-center">{item?.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() =>
                      updateQuantity(item?._id, item?.quantity + 1)
                    }
                  >
                    <Plus className="w-3 h-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 ml-auto text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item?._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span className="font-bold">${subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-muted-foreground">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between mb-6">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">${subtotal?.toFixed(2)}</span>
        </div>

        {/* {isCheckingOut ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Shipping Information</h3>
            <CheckoutForm cartItems={cartItems} />
          </div>
        ) : ( */}
        <Link href="/checkout">
          <Button
            className="w-full text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
            // onClick={() => setIsCheckingOut(true)}
          >
            Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
