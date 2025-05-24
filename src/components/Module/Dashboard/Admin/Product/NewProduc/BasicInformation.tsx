/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SFormInput from "@/components/Shared/Form/SFormInput";
import SFormTextArea from "@/components/Shared/Form/SFormTextArea";
import { Control } from "react-hook-form";
import { TBasicInfo } from "@/types";
import SFormSelect from "@/components/Shared/Form/SFormSelect";
import SFTagSelector from "@/components/Shared/Form/SFTagSelector";
import SFormSwitch from "@/components/Shared/Form/SFormSwicth";

export const categories = [
  { value: "mountain-bikes", label: "Mountain Bikes" },
  { value: "road-bikes", label: "Road Bikes" },
  { value: "hybrid-bikes", label: "Hybrid Bikes" },
  { value: "electric-bikes", label: "Electric Bikes" },
  { value: "accessories", label: "Accessories" },
  { value: "components", label: "Components" },
  { value: "clothing", label: "Clothing" },
  { value: "tools", label: "Tools" },
];

export const availableTags = [
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

interface ProductFormBasicInfoProps {
  control: Control<any>;
  productInfo: TBasicInfo;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (checked: boolean) => void;
}

const BasicInformation = ({
  control,
  // productInfo,
  handleSelectChange,
  handleSwitchChange,
}: ProductFormBasicInfoProps) => {
  const onSelectChange = (name: string) => (value: string) => {
    handleSelectChange(name, value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details about your product
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Product Name */}
        <div className="space-y-2">
          <SFormInput
            control={control}
            name="name"
            placeholder="e.g. Mountain Bike Pro 2023"
            type="text"
            label="Product Name"
          />
        </div>

        {/* Product brand */}
        <div className="space-y-2">
          <SFormInput
            control={control}
            name="brand"
            placeholder="e.g. Hero"
            type="text"
            label="Brand Name"
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <SFormTextArea
            name="description"
            label="Product Description"
            placeholder="Describe your product in detail"
            control={control}
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="relative">
              <SFormInput
                control={control}
                name="price"
                // value={productInfo?.price ?? ""}
                placeholder="0.00"
                type="number"
                label="Price"
              />
            </div>
          </div>
        </div>

        {/*  Sku and Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <SFormInput
              control={control}
              name="quantity"
              // value={productInfo?.barcode ?? ""}
              placeholder="e.g. 525"
              // onChange={handleInputChange}
              type="number"
              label="Quantity"
            />
          </div>

          <div className="space-y-2">
            <SFormInput
              control={control}
              name="sku"
              // value={productInfo?.sku ?? ""}
              placeholder="e.g. MTB-PRO-2023"
              type="text"
              label="SKU"
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <SFormSelect
              name="category"
              label="Category"
              placeholder="Select a category"
              control={control}
              options={categories}
              onChange={onSelectChange("category")}
            />
          </div>
        </div>

        {/* Tags Selector */}
        <div className="space-y-2">
          <SFTagSelector
            name="tags"
            label="Product Tags"
            control={control}
            availableTags={availableTags}
            
          />
        </div>

        {/* Featured Switch and Status Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <SFormSwitch
              name="featured"
              label="Featured Product"
              control={control}
              onChange={(checked) => {
                return handleSwitchChange(checked);
              }}
              // onChange={(checked) => handleSwitchChange("featured", checked)}
            />
          </div>

          <div className="space-y-2">
            <SFormSelect
              name="status"
              label="Product Status"
              placeholder="Select a status"
              control={control}
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
                { label: "Archived", value: "archived" },
              ]}
              onChange={onSelectChange("status")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
