"use client";
import { getAllProducts } from "@/actions/ptoducts";
import ProductsFilter from "@/components/Module/Products/ProductsFilter";
import ProductsGrid from "@/components/Module/Products/ProductsGrid";
import ProductsSkeleton from "@/components/Module/Products/ProductsSkeleton";
import { TProduct } from "@/types";
import { Suspense, useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (filters: {
    categories: string[];
    brands: string[];
    price: [number, number];
  }) => {
    const filtered = products.filter((product) => {
      const inCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.type);

      const inBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      const inPrice =
        product.price >= filters.price[0] && product.price <= filters.price[1];

      return inCategory && inBrand && inPrice;
    });

    setFilteredProducts(filtered);
  };
  return (
    <main className="flex-1 pt-24">
      <div className="container py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="w-full md:w-64 shrink-0">
            <ProductsFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onFilterChange={handleFilterChange}
            />
          </aside>

          <div className="flex-1">
            <h1 className="mb-6 text-3xl font-bold">All Products</h1>

            <Suspense fallback={<ProductsSkeleton />}>
              {filteredProducts.length > 0 ? (
                <ProductsGrid products={filteredProducts} />
              ) : (
                // styles and animated product not aviable
                <h2 className="text-2xl font-semibold">No products found</h2>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
