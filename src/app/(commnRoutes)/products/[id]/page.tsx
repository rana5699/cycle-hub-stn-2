"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ShieldCheck, ArrowLeft, ThumbsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddToCartButton from "@/components/Shared/Button/AddtoCartButton";

import { useParams } from "next/navigation";
import { getSingleProduct } from "@/actions/ptoducts";

import { Skeleton } from "@/components/ui/skeleton";
import { TNewProduct } from "@/types";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<TNewProduct | null>(null);

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
                  product?.images?.[0]?.replace("http://", "https://") ||
                  "/placeholder.svg"
                }
                alt={product?.basicInfo?.name as string}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product?.images?.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden border rounded-lg cursor-pointer aspect-square hover:border-teal-500"
                >
                  <Image
                    src={image}
                    alt={product?.basicInfo?.name as string}
                    className="object-cover"
                    height={200}
                    width={200}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{product?.basicInfo?.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(4 as number)
                          ? "fill-amber text-amber"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {4 as number}
                  (3 reviews)
                </span>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${product?.basicInfo?.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {(product?.basicInfo?.quantity ?? 0) > 0
                    ? `In stock (${
                        product?.basicInfo?.quantity ?? 0
                      } available)`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {/* <div>
                <h3 className="mb-2 text-sm font-medium">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <div
                      key={color.value}
                      className={`w-10 h-10 rounded-full bg-${color.value} cursor-pointer border-2 border-transparent hover:border-teal-500`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div> */}

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
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <p className="text-lg leading-relaxed">
              {product?.basicInfo?.description}
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
        

            <div className="">
              <div>
                <div className="space-y-3">
                  {Object.entries(product?.specifications ?? {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100"
                      >
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            <div className="space-y-8">
              {/* Reviews Summary */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold mb-2">4</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on 3 reviews
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-3">
                  {[
                    { stars: 5, count: 89, percentage: 70 },
                    { stars: 4, count: 28, percentage: 22 },
                    { stars: 3, count: 7, percentage: 6 },
                    { stars: 2, count: 2, percentage: 1 },
                    { stars: 1, count: 1, percentage: 1 },
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm">{rating.stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${rating.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {rating.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">John Doe</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          2 weeks ago
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        &quot;Excellent bike! The build quality is outstanding
                        and it rides incredibly smooth. Perfect for my daily
                        commute and weekend adventures. Highly recommend!&quot;
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          Helpful (12)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      SM
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">Sarah Miller</span>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          1 month ago
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        &quot;Great value for money. The bike arrived
                        well-packaged and assembly was straightforward. Only
                        minor issue was the seat needed adjustment, but overall
                        very satisfied.&quot;
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          Helpful (8)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      MJ
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">Mike Johnson</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          3 weeks ago
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        &quot;Fantastic bike for the price point. The gearing is
                        smooth, brakes are responsive, and it handles well on
                        both city streets and light trails. Customer service was
                        also excellent when I had questions.&quot;
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          Helpful (15)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
