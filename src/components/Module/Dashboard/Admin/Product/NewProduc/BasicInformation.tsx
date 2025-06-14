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
import { BicycleCategory } from "@/types";
import SFormSelect from "@/components/Shared/Form/SFormSelect";
import SFTagSelector from "@/components/Shared/Form/SFTagSelector";
import SFormSwitch from "@/components/Shared/Form/SFormSwicth";

export const categories = Object.values(BicycleCategory).map((type) => ({
  label: type,
  value: type,
}));

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
}

const BasicInformation = ({
  control,
}: ProductFormBasicInfoProps) => {
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
            name="basicInfo.name"
            placeholder="e.g. Mountain Bike Pro 2023"
            type="text"
            label="Product Name"
          />
        </div>

        {/* Product Brand */}
        <div className="space-y-2">
          <SFormInput
            control={control}
            name="basicInfo.brand"
            placeholder="e.g. Hero"
            type="text"
            label="Brand Name"
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <SFormTextArea
            control={control}
            name="basicInfo.description"
            label="Product Description"
            placeholder="Describe your product in detail"
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <SFormInput
              control={control}
              name="basicInfo.price"
              placeholder="0.00"
              type="number"
              label="Price"
            />
          </div>
        </div>

        {/* SKU and Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <SFormInput
              control={control}
              name="basicInfo.quantity"
              placeholder="e.g. 525"
              type="number"
              label="Quantity"
            />
          </div>

          <div className="space-y-2">
            <SFormInput
              control={control}
              name="basicInfo.sku"
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
              control={control}
              name="basicInfo.category"
              label="Category"
              placeholder="Select a category"
              options={categories}
            />
          </div>
        </div>

        {/* Tags Selector */}
        <div className="space-y-2">
          <SFTagSelector
            control={control}
            name="basicInfo.tags"
            label="Product Tags"
            availableTags={availableTags}
          />
        </div>

        {/* Featured Switch and Status Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <SFormSwitch
              control={control}
              name="basicInfo.featured"
              label="Featured Product"
            />
          </div>

          <div className="space-y-2">
            <SFormSelect
              control={control}
              name="basicInfo.status"
              label="Product Status"
              placeholder="Select a status"
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
                { label: "Archived", value: "archived" },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
