/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SFormInput from "@/components/Shared/Form/SFormInput";
import SFormTextArea from "@/components/Shared/Form/SFormTextArea";
import { Control } from "react-hook-form";
import { TBasicInfo } from "@/types";
import SFormSelect from "@/components/Shared/Form/SFormSelect";
import SFTagSelector from "@/components/Shared/Form/SFTagSelector";
import { Switch } from "@/components/ui/switch";

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
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

const BasicInformation = ({
  control,
  productInfo,
  handleInputChange,
  handleNumberInputChange,
  handleSelectChange,
  handleSwitchChange,
}: ProductFormBasicInfoProps) => {

  const onSelectChange = (name: string) => (value: string) => {
    handleSelectChange(name, value);
  };

  const onSwitchChange = (name: string) => (checked: boolean) => {
    handleSwitchChange(name, checked);
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
            
            onChange={handleInputChange}
            type="text"
            label="Product Name"
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <SFormTextArea
            name="description"
            label="Product Description"
            placeholder="Describe your product in detail"
          
            control={control}
            onChange={handleInputChange}
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">
              Price <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <SFormInput
                control={control}
                name="price"
                // value={productInfo?.price ?? ""}
                placeholder="0.00"
                type="number"
                label="Price"
                onChange={handleNumberInputChange}
              />
            </div>
          </div>
        </div>

        {/* SKU and Barcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <SFormInput
              control={control}
              name="sku"
              // value={productInfo?.sku ?? ""}
              placeholder="e.g. MTB-PRO-2023"
              onChange={handleInputChange}
              type="text"
              label="SKU"
            />
          </div>

          <div className="space-y-2">
            <SFormInput
              control={control}
              name="barcode"
              // value={productInfo?.barcode ?? ""}
              placeholder="e.g. 123456789012"
              onChange={handleInputChange}
              type="text"
              label="Barcode"
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
            <Switch
              id="featured"
              checked={productInfo?.featured}
              onCheckedChange={onSwitchChange("featured")}
            />
            <Label htmlFor="featured">Featured Product</Label>
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
