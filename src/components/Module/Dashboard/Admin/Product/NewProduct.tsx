"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronsUpDown,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

// Types
interface ProductFormProps {
  initialData?: Product;
  isEditing?: boolean;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  sku: string;
  barcode?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackInventory: boolean;
  };
  specifications: {
    [key: string]: string;
  };
  variants: ProductVariant[];
  status: "active" | "draft" | "archived";
  featured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sku: string;
  inventory: number;
  attributes: {
    [key: string]: string;
  };
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

const subcategories = {
  "mountain-bikes": [
    { value: "trail", label: "Trail Bikes" },
    { value: "enduro", label: "Enduro Bikes" },
    { value: "downhill", label: "Downhill Bikes" },
    { value: "cross-country", label: "Cross Country Bikes" },
  ],
  "road-bikes": [
    { value: "racing", label: "Racing Bikes" },
    { value: "endurance", label: "Endurance Bikes" },
    { value: "gravel", label: "Gravel Bikes" },
    { value: "touring", label: "Touring Bikes" },
  ],
  "hybrid-bikes": [
    { value: "city", label: "City Bikes" },
    { value: "comfort", label: "Comfort Bikes" },
    { value: "fitness", label: "Fitness Bikes" },
  ],
  "electric-bikes": [
    { value: "e-mountain", label: "E-Mountain Bikes" },
    { value: "e-road", label: "E-Road Bikes" },
    { value: "e-city", label: "E-City Bikes" },
  ],
  accessories: [
    { value: "helmets", label: "Helmets" },
    { value: "lights", label: "Lights" },
    { value: "locks", label: "Locks" },
    { value: "bottles", label: "Water Bottles" },
  ],
  components: [
    { value: "groupsets", label: "Groupsets" },
    { value: "wheels", label: "Wheels" },
    { value: "tires", label: "Tires" },
    { value: "handlebars", label: "Handlebars" },
  ],
  clothing: [
    { value: "jerseys", label: "Jerseys" },
    { value: "shorts", label: "Shorts" },
    { value: "gloves", label: "Gloves" },
    { value: "shoes", label: "Shoes" },
  ],
  tools: [
    { value: "repair-kits", label: "Repair Kits" },
    { value: "pumps", label: "Pumps" },
    { value: "multi-tools", label: "Multi-Tools" },
  ],
};

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
const emptyProduct: Product = {
  name: "",
  description: "",
  price: 0,
  compareAtPrice: 0,
  cost: 0,
  sku: "",
  barcode: "",
  category: "",
  subcategory: "",
  tags: [],
  images: [],
  inventory: {
    quantity: 0,
    lowStockThreshold: 5,
    trackInventory: true,
  },
  specifications: {},
  variants: [],
  status: "draft",
  featured: false,
  seo: {
    title: "",
    description: "",
    keywords: "",
  },
};

export default function NewProductForm({
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState<Product>(initialData || emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.category || ""
  );
  const [availableSubcategories, setAvailableSubcategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [openTagsPopover, setOpenTagsPopover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      setAvailableSubcategories(
        subcategories[selectedCategory as keyof typeof subcategories] || []
      );

      // If current subcategory is not in the new list, clear it
      if (
        product.subcategory &&
        !subcategories[selectedCategory as keyof typeof subcategories]?.some(
          (sub) => sub.value === product.subcategory
        )
      ) {
        setProduct((prev) => ({
          ...prev,
          subcategory: "",
        }));
      }
    } else {
      setAvailableSubcategories([]);
    }
  }, [selectedCategory, product.subcategory]);

  // Update SEO title if product name changes and SEO title is empty
  useEffect(() => {
    if (product.name && !product.seo.title) {
      setProduct((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          title: product.name,
        },
      }));
    }
  }, [product.name, product.seo.title]);

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
          ...((prev[parent as keyof Product] as object) || {}),
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
          ...((prev[parent as keyof Product] as object) || {}),
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
          ...((prev[parent as keyof Product] as object) || {}),
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

  const handleTagToggle = (tag: string) => {
    setProduct((prev) => {
      const currentTags = [...prev.tags];
      const tagIndex = currentTags.indexOf(tag);

      if (tagIndex >= 0) {
        currentTags.splice(tagIndex, 1);
      } else {
        currentTags.push(tag);
      }

      return {
        ...prev,
        tags: currentTags,
      };
    });
  };

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setProduct((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real app, you would upload these to your server or cloud storage
    // For this example, we'll create object URLs
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setProduct((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!product.name.trim()) newErrors["name"] = "Product name is required";
    if (!product.description.trim())
      newErrors["description"] = "Description is required";
    if (product.price <= 0) newErrors["price"] = "Price must be greater than 0";
    if (!product.sku.trim()) newErrors["sku"] = "SKU is required";
    if (!product.category) newErrors["category"] = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send this to your API
      console.log("Submitting product:", product);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success! Redirect back to products page
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error submitting product:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-20 md:mb-10 gap-y-3">
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

          <div className="grid  gap-8 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Enter the basic details about your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Product Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Mountain Bike Pro 2023"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        placeholder="Describe your product in detail"
                        className={cn(
                          "min-h-32",
                          errors.description ? "border-red-500" : ""
                        )}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">
                          Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.price || ""}
                            onChange={handleNumberInputChange}
                            placeholder="0.00"
                            className={cn(
                              "pl-7",
                              errors.price ? "border-red-500" : ""
                            )}
                          />
                        </div>
                        {errors.price && (
                          <p className="text-red-500 text-sm">{errors.price}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="compareAtPrice">Compare-at Price</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="compareAtPrice"
                            name="compareAtPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.compareAtPrice || ""}
                            onChange={handleNumberInputChange}
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cost">Cost per Item</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="cost"
                            name="cost"
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.cost || ""}
                            onChange={handleNumberInputChange}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sku">
                          SKU <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="sku"
                          name="sku"
                          value={product.sku}
                          onChange={handleInputChange}
                          placeholder="e.g. MTB-PRO-2023"
                          className={errors.sku ? "border-red-500" : ""}
                        />
                        {errors.sku && (
                          <p className="text-red-500 text-sm">{errors.sku}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="barcode">
                          Barcode (ISBN, UPC, GTIN, etc.)
                        </Label>
                        <Input
                          id="barcode"
                          name="barcode"
                          value={product.barcode || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. 123456789012"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={product.category}
                          onValueChange={(value) =>
                            handleSelectChange("category", value)
                          }
                        >
                          <SelectTrigger
                            id="category"
                            className={errors.category ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-red-500 text-sm">
                            {errors.category}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Select
                          value={product.subcategory || ""}
                          onValueChange={(value) =>
                            handleSelectChange("subcategory", value)
                          }
                          disabled={
                            !selectedCategory ||
                            availableSubcategories.length === 0
                          }
                        >
                          <SelectTrigger id="subcategory">
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSubcategories.map((subcategory) => (
                              <SelectItem
                                key={subcategory.value}
                                value={subcategory.value}
                              >
                                {subcategory.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Popover
                        open={openTagsPopover}
                        onOpenChange={setOpenTagsPopover}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openTagsPopover}
                            className="w-full justify-between"
                          >
                            {product.tags.length > 0
                              ? `${product.tags.length} tag${
                                  product.tags.length > 1 ? "s" : ""
                                } selected`
                              : "Select tags"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search tags..." />
                            <CommandList>
                              <CommandEmpty>No tags found.</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-auto">
                                {availableTags.map((tag) => (
                                  <CommandItem
                                    key={tag}
                                    onSelect={() => handleTagToggle(tag)}
                                    className="flex items-center"
                                  >
                                    <Checkbox
                                      checked={product.tags.includes(tag)}
                                      className="mr-2"
                                    />
                                    <span>{tag}</span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleTagToggle(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={product.featured}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("featured", checked)
                          }
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Product Status</Label>
                        <Select
                          value={product.status}
                          onValueChange={(
                            value: "active" | "draft" | "archived"
                          ) => handleSelectChange("status", value)}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Upload images of your product. The first image will be
                      used as the product thumbnail.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square border rounded-md overflow-hidden group"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {index === 0 && (
                            <Badge className="absolute top-2 left-2 bg-primary">
                              Main
                            </Badge>
                          )}
                        </div>
                      ))}
                      <div
                        className="border border-dashed rounded-md aspect-square flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground text-center mt-1">
                          PNG, JPG or WEBP (max 5MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Information</CardTitle>
                    <CardDescription>
                      Manage your product inventory and stock levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="inventory.quantity">Quantity</Label>
                        <Input
                          id="inventory.quantity"
                          name="inventory.quantity"
                          type="number"
                          min="0"
                          value={product.inventory.quantity || ""}
                          onChange={handleNumberInputChange}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inventory.lowStockThreshold">
                          Low Stock Threshold
                        </Label>
                        <Input
                          id="inventory.lowStockThreshold"
                          name="inventory.lowStockThreshold"
                          type="number"
                          min="0"
                          value={product.inventory.lowStockThreshold || ""}
                          onChange={handleNumberInputChange}
                          placeholder="5"
                        />
                        <p className="text-xs text-muted-foreground">
                          You&apos;ll be alerted when stock reaches this level
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="trackInventory"
                        checked={product.inventory.trackInventory}
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            "inventory.trackInventory",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="trackInventory">Track Inventory</Label>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Product Variants
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add variants if this product comes in multiple options
                        like different sizes or colors.
                      </p>

                      {product.variants.length > 0 ? (
                        <div className="space-y-4">
                          {/* Variant list would go here */}
                          <p className="text-sm text-muted-foreground">
                            No variants added yet. Click the button below to add
                            variants.
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No variants added yet. Click the button below to add
                          variants.
                        </p>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          // This would open a variant editor in a real implementation
                          alert("Variant editor would open here");
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Variants
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Specifications</CardTitle>
                    <CardDescription>
                      Add technical details and specifications for your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newSpecKey">Specification Name</Label>
                        <Input
                          id="newSpecKey"
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          placeholder="e.g. Weight, Material, Size"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newSpecValue">
                          Specification Value
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="newSpecValue"
                            value={newSpecValue}
                            onChange={(e) => setNewSpecValue(e.target.value)}
                            placeholder="e.g. 12kg, Aluminum, Large"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={handleAddSpecification}
                            disabled={
                              !newSpecKey.trim() || !newSpecValue.trim()
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
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

              <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Information</CardTitle>
                    <CardDescription>
                      Optimize your product for search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="seo.title">Page Title</Label>
                      <Input
                        id="seo.title"
                        name="seo.title"
                        value={product.seo.title}
                        onChange={handleInputChange}
                        placeholder="SEO title (appears in search engine results)"
                      />
                      <p className="text-xs text-muted-foreground">
                        {product.seo.title.length}/60 characters recommended
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seo.description">Meta Description</Label>
                      <Textarea
                        id="seo.description"
                        name="seo.description"
                        value={product.seo.description}
                        onChange={handleInputChange}
                        placeholder="Brief description for search results"
                        className="min-h-24"
                      />
                      <p className="text-xs text-muted-foreground">
                        {product.seo.description.length}/160 characters
                        recommended
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seo.keywords">Keywords</Label>
                      <Input
                        id="seo.keywords"
                        name="seo.keywords"
                        value={product.seo.keywords}
                        onChange={handleInputChange}
                        placeholder="e.g. mountain bike, cycling, outdoor sports"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate keywords with commas
                      </p>
                    </div>

                    <div className="p-4 border rounded-md bg-muted/10">
                      <h3 className="font-medium mb-2">Search Preview</h3>
                      <div className="space-y-1">
                        <p className="text-blue-600 text-lg truncate">
                          {product.seo.title || product.name || "Product Title"}
                        </p>
                        <p className="text-green-700 text-sm">
                          www.cyclehub.com/products/
                          {product.sku
                            ? product.sku.toLowerCase().replace(/\s+/g, "-")
                            : "product-url"}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.seo.description ||
                            product.description ||
                            "Product description will appear here."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
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
                        {product.name || "New Product"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.sku || "No SKU"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge
                        variant={
                          product.status === "active" ? "default" : "secondary"
                        }
                      >
                        {product.status === "active"
                          ? "Active"
                          : product.status === "draft"
                          ? "Draft"
                          : "Archived"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>
                        {product.category
                          ? categories.find((c) => c.value === product.category)
                              ?.label || product.category
                          : "Uncategorized"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inventory</span>
                      <span>{product.inventory.quantity} in stock</span>
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
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Basic information
                      </li>
                      <li className="flex items-center">
                        {product.images.length > 0 ? (
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 mr-1 text-red-500" />
                        )}
                        Product images
                      </li>
                      <li className="flex items-center">
                        {Object.keys(product.specifications).length > 0 ? (
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 mr-1 text-red-500" />
                        )}
                        Specifications
                      </li>
                      <li className="flex items-center">
                        {product.seo.description ? (
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
  );
}
