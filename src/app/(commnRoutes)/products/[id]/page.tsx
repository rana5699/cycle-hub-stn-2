"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddToCartButton from "@/components/Shared/Button/AddtoCartButton";

import { useParams } from "next/navigation";
import { getSingleProduct } from "@/actions/ptoducts";
import { TProduct } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSingleProduct(id as string);
      setProduct(data?.data);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Skeleton className="h-[250px] w-full" />
        <div className="p-4">
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1">
      <div className="container py-20">
        <Link
          href="/products"
          className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden border rounded-lg aspect-square">
              <Image
                src={
                  product?.imageUrl?.replace("http://", "https://") ||
                  "/placeholder.svg"
                }
                alt={product?.name as string}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden border rounded-lg cursor-pointer aspect-square hover:border-teal-500"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product?.rating as number)
                          ? "fill-amber text-amber"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {product?.rating as number}
                  {/* ({product.reviews} reviews) */}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${product?.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {(product?.quantity ?? 0) > 0
                    ? `In stock (${product?.quantity ?? 0} available)`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-medium">Color</h3>
                {/* <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <div
                      key={color.value}
                      className={`w-10 h-10 rounded-full bg-${color.value} cursor-pointer border-2 border-transparent hover:border-teal-500`}
                      title={color.name}
                    />
                  ))}
                </div> */}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Size</h3>
                {/* <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <Button key={size} variant="outline" className="w-12 h-12">
                      {size}
                    </Button>
                  ))}
                </div> */}
              </div>

              <div className="pt-4">
                {product && <AddToCartButton product={product} />}
              </div>

              <div className="py-4 space-y-4 border-t border-b">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 mr-3 text-teal-500" />
                  <div>
                    <h4 className="text-sm font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Free standard shipping on orders over $100
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-3 text-teal-500" />
                  <div>
                    <h4 className="text-sm font-medium">2-Year Warranty</h4>
                    <p className="text-sm text-muted-foreground">
                      Full coverage for manufacturing defects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="justify-start w-full border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <p className="text-lg leading-relaxed">{product?.description}</p>
          </TabsContent>
        
        </Tabs>
      </div>
    </main>
  );
}
