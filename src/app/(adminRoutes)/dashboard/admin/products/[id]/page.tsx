"use client";

import { getSingleProduct } from "@/actions/ptoducts";
import ProductForm from "@/components/Module/Dashboard/Admin/Product/NewProduc/NewProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { TNewProduct } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductEditPage = () => {
  const params = useParams();
  const id = params.id;
  const [productData, setProductData] = useState<TNewProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("Product ID is not provided");
        return;
      }
      setLoading(true);
      try {
        const response = await getSingleProduct(id as string);
        const product = response.data;

          //  console.log("Fetched product:", product);
          setProductData(product);
          setLoading(false);
        
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-48 w-full rounded-md" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>;
  }

  // console.log("Product data:", productData);

  return (
    <div>
      {/* ProductEditPage for {`${id}`} */}
      <ProductForm initialData={productData as TNewProduct} isEditing={true} />
    </div>
  );
};

export default ProductEditPage;
