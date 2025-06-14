/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SFormImageUpload from "@/components/Shared/Form/SFormImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Control } from "react-hook-form";

interface IProductImageSectionProps {
  control: Control<any>;
  handleAddImage: any;
  images : string[]
}

const ImageSectionTab = ({
  control,
  handleAddImage,
}: IProductImageSectionProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Upload images of your product. The first image will be used as the
            product thumbnail.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SFormImageUpload
            name="images"
            control={control}
            multiple
            onImageUpload={handleAddImage}

          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageSectionTab;
