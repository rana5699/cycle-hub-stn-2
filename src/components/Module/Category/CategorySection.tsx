"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TNewProduct } from "@/types";

export type TCategory = {
  id: number;
  name: string;
  image: string;
  link: string;
};

const categoriesDemo: TCategory[] = [
  {
    id: 1,
    name: "Road Bikes",
    image: "https://i.ibb.co/qLtFv0Tr/images.jpg",
    link: "/products/category/road-bikes",
  },
  {
    id: 2,
    name: "Mountain Bikes",
    image: "https://i.ibb.co/1JLg2nB5/images-1.jpg",
    link: "/products/category/mountain-bikes",
  },
  {
    id: 3,
    name: "Electric Bikes",
    image: "https://i.ibb.co/hFvDkYdQ/images-2.jpg",
    link: "/products/category/electric-bikes",
  },
  {
    id: 4,
    name: "Hybrid Bikes",
    image: "https://i.ibb.co/RpW1xrn8/images-3.jpg",
    link: "/products/category/hybrid-bikes",
  },
  {
    id: 5,
    name: "BMX Bikes",
    image: "https://i.ibb.co/cSQ9z8Dv/images-4.jpg",
    link: "/products/category/bmx-bikes",
  },
  {
    id: 6,
    name: "Accessories",
    image: "https://i.ibb.co/spZpPKTz/yamaha-bike-accessories.jpg",
    link: "/products/category/accessories",
  },
];

export default function CategorySection({
  products,
}: {
  products: TNewProduct[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth / 2
          : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const categoryImages: Record<string, string> = {
    Road: "https://i.ibb.co/qLtFv0Tr/images.jpg",
    Mountain: "https://i.ibb.co/1JLg2nB5/images-1.jpg",
    Electric: "https://i.ibb.co/hFvDkYdQ/images-2.jpg",
    Hybrid: "https://i.ibb.co/RpW1xrn8/images-3.jpg",
    BMX: "https://i.ibb.co/cSQ9z8Dv/images-4.jpg",
    Accessories: "https://i.ibb.co/spZpPKTz/yamaha-bike-accessories.jpg",
  };

  const uniqueCategories = Array.from(
    new Set(products?.map((p) => p?.basicInfo?.category))
  );

  const categories: TCategory[] = uniqueCategories?.map((name, index) => ({
    id: index + 1,
    name,
    image: categoryImages[name] || "/placeholder.svg",
    link: `/products/category/${name?.toLowerCase().replace(/\s+/g, "-")}`,
  }));


  return (
    <div className="relative mt-8">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
      >
        {categoriesDemo?.map((category: TCategory) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5 }}
            className="flex-shrink-0 w-[250px] snap-start"
          >
            <Link href={category.link}>
              <Card className="overflow-hidden">
                <div className="relative h-[200px]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-center">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
