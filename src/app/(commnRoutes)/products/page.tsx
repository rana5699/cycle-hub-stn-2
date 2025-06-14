"use client";
import { getAllProducts } from "@/actions/ptoducts";
import ProductNotFound from "@/components/Module/Products/ProductNotFound";
import ProductsFilter from "@/components/Module/Products/ProductsFilter";
import ProductsGrid from "@/components/Module/Products/ProductsGrid";
import ProductsSkeleton from "@/components/Module/Products/ProductsSkeleton";
import { TNewProduct } from "@/types";
import { Suspense, useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<TNewProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TNewProduct[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const { data } = await getAllProducts();

      setProducts(data);

      setFilteredProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (filters: {
    categories: string[];
    brands: string[];
    price: [number, number];
  }) => {
    // setLoading(true);
    const filtered = products.filter((product) => {
      const inCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product?.basicInfo?.category);

      const inBrand =
        filters.brands.length === 0 ||
        filters.brands.includes(product.basicInfo.brand);

      const inPrice =
        product?.basicInfo?.price >= filters.price[0] &&
        product?.basicInfo?.price <= filters.price[1];

      return inCategory && inBrand && inPrice;
      // setLoading(false);
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

            <Suspense fallback={loading ? <ProductsSkeleton /> : null}>
              {loading && <ProductsSkeleton />}
              {filteredProducts.length > 0 ? (
                <ProductsGrid products={filteredProducts} />
              ) : (

                <ProductNotFound />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
