/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState,  useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  Loader2,
  Save,
  X,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TNewProduct } from "@/types";
import BasicInformation from "./BasicInformation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

// Types
interface ProductFormProps {
  initialData?: TNewProduct;
  isEditing?: boolean;
}

// Sample data for dropdowns
const categories = [
  { value: "mountain-bikes", label: "Mountain Bikes" },
  { value: "road-bikes", label: "Road Bikes" },
  { value: "hybrid-bikes", label: "Hybrid Bikes" },
  { value: "electric-bikes", label: "Electric Bikes" },
  { value: "accessories", label: "Accessories" },
  { value: "components", label: "Components" },
  { value: "clothing", label: "Clothing" },
  { value: "tools", label: "Tools" },
];

const availableTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "limited",
  "premium",
  "beginner",
  "intermediate",
  "advanced",
  "professional",
  "aluminum",
  "carbon",
  "steel",
  "titanium",
  "men",
  "women",
  "unisex",
  "kids",
];

// Default empty product
const emptyProduct: TNewProduct = {
  basicInfo: {
    name: "",
    description: "",
    price: 0,
    sku: "",
    barcode: "",
    category: "",
    tags: [],
    featured: false,
    status: "draft",
  },
  tags: [],
  images: [],
  inventory: {
    quantity: 0,
    lowStockThreshold: 5,
    trackInventory: true,
  },
  specifications: {},
  variants: [],
  seo: {
    title: "",
    description: "",
    keywords: "",
  },
};

export default function ProductForm({
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const form = useForm({
    defaultValues: initialData || emptyProduct,
  });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState<TNewProduct>(
    initialData || emptyProduct
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.basicInfo?.category || ""
  );

  // Update SEO title if product name changes and SEO title is empty
  useEffect(() => {
    if (product?.basicInfo?.name && !product.seo.title) {
      setProduct((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          title: product?.basicInfo?.name,
        },
      }));
    }
  }, [product?.basicInfo?.name, product.seo.title]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof TNewProduct] || {}) as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 0 : Number.parseFloat(value);

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof TNewProduct] || {}) as Record<string, any>),
          [child]: numValue,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof TNewProduct] || {}) as Record<string, any>),
          [child]: checked,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    // Special case for category to update subcategories
    if (name === "category") {
      setSelectedCategory(value);
    }

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-muted-foreground">
                {isEditing
                  ? "Update product information and inventory"
                  : "Create a new product in your inventory"}
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="gradient-bg gradient-bg-hover w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Product
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:gradient-bg"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:gradient-bg"
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:gradient-bg"
              >
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:gradient-bg"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="data-[state=active]:gradient-bg"
              >
                SEO
              </TabsTrigger>
            </TabsList>

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TabsContent value="basic">
                  <BasicInformation
                    productInfo={product.basicInfo}
                    handleInputChange={handleInputChange}
                    handleNumberInputChange={handleNumberInputChange}
                    handleSelectChange={handleSelectChange}
                    handleSwitchChange={handleSwitchChange}
                    control={form.control}
                  />
                </TabsContent>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Product Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        {product?.images?.length > 0 ? (
                          <Image
                            src={product?.images[0] || "/placeholder.svg"}
                            alt={product?.basicInfo?.name}
                            className="h-full w-full object-cover"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <Package className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-1">
                          {product?.basicInfo?.name || "New Product"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product?.basicInfo?.sku || "No SKU"}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={
                            product?.basicInfo?.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {product?.basicInfo?.status === "active"
                            ? "Active"
                            : product?.basicInfo?.status === "draft"
                            ? "Draft"
                            : "Archived"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium">
                          ${product?.basicInfo?.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span>
                          {product?.basicInfo?.category
                            ? categories.find(
                                (c) => c.value === product?.basicInfo?.category
                              )?.label || product?.basicInfo?.category
                            : "Uncategorized"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Inventory</span>
                        <span>{product?.inventory?.quantity} in stock</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setActiveTab("images")}
                        >
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Add Images
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setActiveTab("inventory")}
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Inventory
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="flex-1 text-sm font-medium">
                          Completion
                        </span>
                        <span className="text-xs text-muted-foreground">
                          70%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full gradient-bg w-[70%]" />
                      </div>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li className="flex items-center">
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                          Basic information
                        </li>
                        <li className="flex items-center">
                          {product?.images?.length > 0 ? (
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 mr-1 text-red-500" />
                          )}
                          Product images
                        </li>
                        <li className="flex items-center">
                          {Object.keys(product?.specifications)?.length > 0 ? (
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 mr-1 text-red-500" />
                          )}
                          Specifications
                        </li>
                        <li className="flex items-center">
                          {product?.seo?.description ? (
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 mr-1 text-red-500" />
                          )}
                          SEO information
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full gradient-bg gradient-bg-hover"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Product
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </form>
    </Form>
  );
}
