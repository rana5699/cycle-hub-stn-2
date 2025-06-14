/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Control } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

interface IFormImageUploadProps {
  name: string;
  label?: string;
  control: Control<any>;
  multiple?: boolean;
  accept?: string;
  onImageUpload: (files: File[] | File) => void;
}

const SFormImageUpload = ({
  name,
  label,
  control,
  multiple = false,
  accept = "image/*",
  onImageUpload,
}: IFormImageUploadProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [initialImageUrls, setInitialImageUrls] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentValue = control._formValues[name] as any;
    if (Array.isArray(currentValue) && typeof currentValue[0] === "string") {
      setInitialImageUrls(currentValue);
    }
  }, [control, name]);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: any) => void
  ) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (multiple && initialImageUrls.length + selectedFiles.length + fileArray.length > 5) {
      toast.warning("You can only upload a maximum of 5 images.");
      return;
    }

    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    const updatedFiles = multiple ? [...selectedFiles, ...fileArray] : fileArray;
    const updatedPreviews = multiple ? [...previewImages, ...newPreviews] : newPreviews;

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);

    const updatedValue = [...initialImageUrls, ...updatedFiles];
    fieldOnChange(updatedValue);
    onImageUpload(multiple ? updatedFiles : updatedFiles[0]);
  };

  const handleRemoveImage = (
    index: number,
    fieldOnChange: (value: any) => void,
    isUrl = false
  ) => {
    if (isUrl) {
      const updatedUrls = initialImageUrls.filter((_, i) => i !== index);
      setInitialImageUrls(updatedUrls);
      fieldOnChange([...updatedUrls, ...selectedFiles]);
    } else {
      const newPreviews = previewImages.filter((_, i) => i !== index);
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setPreviewImages(newPreviews);
      setSelectedFiles(newFiles);
      fieldOnChange([...initialImageUrls, ...newFiles]);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            {/* Upload Box */}
            <FormControl>
              <div
                className="w-full md:w-[250px] border border-dashed rounded-md aspect-square flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {accept.toUpperCase()} (max 5MB)
                </p>
                <Input
                  className="hidden"
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  ref={fileInputRef}
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </div>
            </FormControl>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-4">
              {/* Initial Image URLs */}
              {initialImageUrls.map((url, index) => (
                <div
                  key={`url-${index}`}
                  className="relative w-[150px] h-[150px] border rounded-md overflow-hidden group"
                >
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(index, field.onChange, true)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-primary">Main</Badge>
                  )}
                </div>
              ))}

              {/* Newly Uploaded Images */}
              {previewImages.map((image, index) => (
                <div
                  key={`preview-${index}`}
                  className="relative w-[150px] h-[150px] border rounded-md overflow-hidden group"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Preview image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(index, field.onChange, false)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-primary">Main</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SFormImageUpload;
