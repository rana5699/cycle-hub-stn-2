"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductsFilterProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  onFilterChange?: (filters: {
    categories: string[];
    brands: string[];
    price: [number, number];
  }) => void;
};

export default function ProductsFilter({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
   onFilterChange,
}: ProductsFilterProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    { id: "Road", name: "Road Bikes" },
    { id: "mountain-bikes", name: "Mountain Bikes" },
    { id: "electric-bikes", name: "Electric Bikes" },
    { id: "Hybrid", name: "Hybrid Bikes" },
    { id: "bmx-bikes", name: "BMX Bikes" },
    { id: "accessories", name: "Accessories" },
  ];

  const brands = [
    { id: "hero", name: "Hero" },
    { id: "SoundWave", name: "SoundWave" },
    { id: "TechSphere", name: "TechSphere" },
    { id: "cannondale", name: "Carbondale" },
    { id: "AudioXpert", name: "Audio Expert" },
  ];

  const toggleItem = (
    id: string,
    selectedItems: string[],
    setSelected: (val: string[]) => void
  ) => {
    setSelected(
      selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 3000]);
  };

  const applyFilters = () => {
    onFilterChange?.({
      categories: selectedCategories,
      brands: selectedBrands,
      price: priceRange,
    });
    setMobileFiltersOpen(false);
  };

  const FilterTag = ({
    label,
    onRemove,
  }: {
    label: string;
    onRemove: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-muted rounded-full px-3 py-1 text-sm flex items-center"
    >
      {label}
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 ml-1 hover:bg-transparent"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </Button>
    </motion.div>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {(selectedCategories.length > 0 ||
          selectedBrands.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 3000) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "brands"]}
      >
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${cat.id}`}
                    checked={selectedCategories.includes(cat.id)}
                    onCheckedChange={() =>
                      toggleItem(
                        cat.id,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                  />
                  <Label htmlFor={`category-${cat.id}`} className="text-sm">
                    {cat.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 3000]}
                max={3000}
                step={50}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() =>
                      toggleItem(brand.id, selectedBrands, setSelectedBrands)
                    }
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 hidden md:block">
        <Button
          onClick={applyFilters}
          className="w-full bg-gradient-to-r from-navy-blue to-teal-500 text-white"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filters */}
      <div className="md:hidden mb-4">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <FilterContent />
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Button
                onClick={applyFilters}
                className="w-full bg-gradient-to-r from-navy-blue to-teal-500 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block sticky top-24">
        <FilterContent />
      </div>

      {/* Active Filters Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <AnimatePresence>
          {selectedCategories.map((id) => {
            const label = categories.find((c) => c.id === id)?.name || id;
            return (
              <FilterTag
                key={`cat-${id}`}
                label={label}
                onRemove={() =>
                  toggleItem(id, selectedCategories, setSelectedCategories)
                }
              />
            );
          })}
          {selectedBrands.map((id) => {
            const label = brands.find((b) => b.id === id)?.name || id;
            return (
              <FilterTag
                key={`brand-${id}`}
                label={label}
                onRemove={() =>
                  toggleItem(id, selectedBrands, setSelectedBrands)
                }
              />
            );
          })}
          {(priceRange[0] > 0 || priceRange[1] < 3000) && (
            <FilterTag
              key="price"
              label={`$${priceRange[0]} - $${priceRange[1]}`}
              onRemove={() => setPriceRange([0, 3000])}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
