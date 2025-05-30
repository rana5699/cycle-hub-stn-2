/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TNewProduct } from "@/types";


export default function HeroSlider({ products }: { products: TNewProduct[] }) {
  const topFiveProducts = products.slice(0, 5);
 
  const [currentSlide, setCurrentSlide] = useState(0);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === topFiveProducts?.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? topFiveProducts?.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // console.log(topFiveProducts, "from hero");

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={
                topFiveProducts[currentSlide]?.images?.[0]?.replace(
                  "http://",
                  "https://"
                ) || "/placeholder.svg"
              }
              alt={topFiveProducts[currentSlide]?.basicInfo?.name || "Hero Image"}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="max-w-lg space-y-4 text-white"
                >
                  <h1 className="text-4xl font-bold md:text-6xl">
                    {topFiveProducts[currentSlide]?.basicInfo?.name || "Featured Product"}
                  </h1>
                  <p className="text-lg md:text-xl">
                    {topFiveProducts[currentSlide]?.basicInfo?.description?.   slice(0, 100)}
                  </p>
                  <Link href={`products/${topFiveProducts[currentSlide]?._id}`}>
                    <Button
                      size="lg"
                      className="mt-4 bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
                    >
                      {topFiveProducts[currentSlide]?.basicInfo?.name}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
        {topFiveProducts?.map((product: any, index: any) => (
          <Button
            key={product?._id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute p-2 text-white -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/30 hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute p-2 text-white -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/30 hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
