/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { motion } from "framer-motion";
import { getAllProducts } from "@/actions/ptoducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TNewProduct } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SearchProducts = ({ setIsSearchOpen }: { setIsSearchOpen: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<TNewProduct[]>([]);
  const [allProducts, setAllProducts] = useState<TNewProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await getAllProducts();
        setProducts(res?.data);
        setAllProducts(res?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === "") {
      setProducts(allProducts);
      return;
    }

    const searchedProducts = allProducts?.filter((product) =>
      product?.basicInfo?.name?.toLowerCase().includes(value.toLowerCase())
    );

    setProducts(searchedProducts);
  };
  return (
    <div className="relative max-w-xl mx-auto mt-5">
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          autoFocus
        />
        <Button
          type="button"
          variant="link"
          onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
            setProducts(allProducts);
          }}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {isLoading && (
        <div className="mt-4 space-y-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
      {searchQuery && (
        <Card className="absolute z-50 mt-2 w-full border shadow-xl rounded-xl">
          <ScrollArea className="max-h-80">
            <CardContent className="p-2">
              {products.length > 0 ? (
                <ul className="space-y-2">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage
                          src={product?.images?.[0] || "/placeholder.png"}
                        />
                        <AvatarFallback>
                          {product.basicInfo?.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className=" font-medium">
                          {product.basicInfo?.name}
                        </div>
                        <div className="text-lg text-red-500 font-bold">
                          ${product.basicInfo?.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No products found.
                </p>
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default SearchProducts;
