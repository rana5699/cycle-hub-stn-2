/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TNewProduct } from "@/types";
import BasicInformation from "./BasicInformation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useImageUploader from "@/utils/useImageUploader";
import ImageSectionTab from "./ImageSectionTab";
import SFormInput from "@/components/Shared/Form/SFormInput";
import { createProduct, updateProduct } from "@/actions/ptoducts";
import { toast } from "sonner";

// Types
interface ProductFormProps {
  initialData?: TNewProduct;
  isEditing?: boolean;
}

// Default empty product
const emptyProduct: TNewProduct = {
  _id: "",
  isDeleted: false,
  basicInfo: {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    sku: "",
    category: "",
    brand: "",
    tags: [],
    featured: false,
    status: "draft",
  },
  tags: [],
  images: [],
  specifications: {},
  inStock: false,
  createdBy: "",
  updatedBy: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ProductForm({
  initialData,
  isEditing,
}: ProductFormProps) {
  const form = useForm({
    defaultValues: initialData || emptyProduct,
  });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [product, setProduct] = useState<TNewProduct>(
    initialData || emptyProduct
  );

  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.basicInfo?.category || ""
  );
  const [productImageUrl, setProductImageUrl] = useState<File | File[]>([]);
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();

  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const handleSwitchChange = (checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        featured: checked,
      },
    }));
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

  const handleInputChange = (
    name: string,
    value: string | number | boolean
  ) => {
    setProduct((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
    }));
  };

  const handleNumberInputChange = (name: string, value: number) => {
    setProduct((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
    }));
  };

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setProduct((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue,
        },
      }));
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleRemoveSpecification = (key: string) => {
    setProduct((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return {
        ...prev,
        specifications: newSpecs,
      };
    });
  };

  const handleSubmit = async (data: any) => {
    const uploadedImageUrl = await uploadImagesToCloudinary(
      productImageUrl,
      true
    );

    const basic = data.basicInfo || {};
    const productData = {
      basicInfo: {
        name: basic.name,
        description: basic.description,
        brand: basic.brand,
        price: Number(basic.price),
        sku: basic.sku,
        tags: basic.tags,
        quantity: Number(basic.quantity),
        featured: basic.featured,
        status: basic.status,
        category: selectedCategory || basic.category || "BMX",
      },
      images: uploadedImageUrl,
      specifications: product?.specifications || {},
    };


    try {
      let response;

      if (isEditing && initialData?._id) {

        const updatedData = {
          ...initialData,
          
          basicInfo: {
            ...initialData.basicInfo,
            ...productData.basicInfo,
          },
          images: uploadedImageUrl.length
            ? uploadedImageUrl
            : initialData.images,
          specifications: product?.specifications || initialData.specifications,
          updatedAt: new Date().toISOString(),
          updatedBy: "admin",
        };

        console.log(updatedData, "updatedData");

        response = await updateProduct(initialData._id, updatedData);

        // console.log(response, "response from client");

      } else {
        response = await createProduct(productData);
      }



      if (response.success) {
        form.reset();
        setProduct(emptyProduct);
        setProductImageUrl([]);
        setActiveTab("basic");
        toast.success(
          isEditing
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
        router.push("/dashboard/admin/products");
      }
      // console.log(response, "FROM client");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // const isBasicInfoValid = () => {
  //   const { name, description, price, quantity, sku, category, brand } =
  //     product.basicInfo;
  //   return (
  //     name &&
  //     description &&
  //     price > 0 &&
  //     quantity > 0 &&
  //     sku &&
  //     category &&
  //     brand
  //   );
  // };

  // const isImagesValid = () => {
  //   return Array.isArray(productImageUrl)
  //     ? productImageUrl.length > 0
  //     : !!productImageUrl;
  // };

  // console.log(initialData, "isEditing");

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
                disabled={isUploading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="gradient-bg gradient-bg-hover w-full sm:w-auto"
                disabled={isUploading}
              >
                {isUploading ? (
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
            <TabsList className="grid grid-cols-3  mb-8">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:gradient-bg"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:gradient-bg"
                // disabled={!isBasicInfoValid()}
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:gradient-bg"
                // disabled={!isBasicInfoValid() || !isImagesValid()}
              >
                Specifications
              </TabsTrigger>
            </TabsList>

            <div className="grid gap-5 grid-cols-1">
              <div className="lg:col-span-2">
                <TabsContent value="basic">
                  <BasicInformation
                    // productInfo={product.basicInfo}
                    // handleSelectChange={handleSelectChange}
                    // handleSwitchChange={handleSwitchChange}
                    // handleInputChange={handleInputChange}
                    // handleNumberInputChange={handleNumberInputChange}
                    control={form.control}
                  />
                </TabsContent>
              </div>
              <div className="lg:col-span-2">
                <TabsContent value="images">
                  <ImageSectionTab
                    control={form.control}
                    handleAddImage={setProductImageUrl}
                    images={product?.images}
                  />
                </TabsContent>
              </div>

              <div className="lg:col-span-2">
                <TabsContent value="specifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Specifications</CardTitle>
                      <CardDescription>
                        Add technical details and specifications for your
                        product
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <SFormInput
                            control={form.control}
                            name="newSpecKey"
                            placeholder="e.g. 12kg"
                            type="text"
                            label="Specification Value"
                            onChange={(e) => setNewSpecKey(e.target.value)}
                          />
                        </div>

                        <div className="">
                          <SFormInput
                            control={form.control}
                            name="newSpecValue"
                            placeholder="e.g. 12kg"
                            type="text"
                            label="Specification Value"
                            onChange={(e) => setNewSpecValue(e.target.value)}
                          />

                          <Button
                            className="mt-3 text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
                            type="button"
                            onClick={handleAddSpecification}
                            disabled={
                              !newSpecKey.trim() || !newSpecValue.trim()
                            }
                          >
                            <Plus className="h-10 w-10 " />
                          </Button>
                        </div>
                      </div>

                      {Object.keys(product.specifications).length > 0 ? (
                        <div className="border rounded-md overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-muted">
                              <tr>
                                <th className="text-left p-2 font-medium">
                                  Specification
                                </th>
                                <th className="text-left p-2 font-medium">
                                  Value
                                </th>
                                <th className="p-2 w-16"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(product.specifications).map(
                                ([key, value]) => (
                                  <tr key={key} className="border-t">
                                    <td className="p-2 font-medium">{key}</td>
                                    <td className="p-2">{value}</td>
                                    <td className="p-2">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          handleRemoveSpecification(key)
                                        }
                                      >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center p-8 border rounded-md bg-muted/10">
                          <p className="text-muted-foreground">
                            No specifications added yet. Add specifications to
                            provide detailed information about your product.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <Button
                    type="submit"
                    className="w-full gradient-bg gradient-bg-hover"
                    disabled={isUploading}
                  >
                    {isUploading ? (
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
                  {/* </CardFooter> */}
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </form>
    </Form>
  );
}
