import { getAllProducts } from "@/actions/ptoducts";
import CategorySection from "@/components/Module/Category/CategorySection";
import ExperienceSection from "@/components/Module/Home/ExperienceSection";
import HeroSlider from "@/components/Module/Home/HeroSlider";
import NewsletterSection from "@/components/Module/Home/NewletterSection";
import OffersSection from "@/components/Module/Home/OfferedSection";
import FeaturedProducts from "@/components/Module/Products/FeaturedProducts/FeaturedProducts";
import TestimonialSection from "@/components/Module/TestimonialSection/TestimonialSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  const { data: products } = await getAllProducts();

  // console.log(data,"from client")
  return (
    <main className="flex-1">
      <HeroSlider products={products} />

      <section className="container py-12 md:py-20">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Shop by Category
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Explore our wide range of bicycles and accessories for every type
              of rider
            </p>
          </div>
        </div>
        <CategorySection />
      </section>

      <section className="container py-12 md:py-20">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Products
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Discover our top-rated bicycles and accessories
            </p>
          </div>
        </div>
        <FeaturedProducts products={products} />
        <div className="flex justify-center mt-10">
          <Link href="/products">
            <Button
              size="lg"
              className="text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      <section className="container py-12 md:py-20">
        <OffersSection />
      </section>

      <section className="container py-12 md:py-20">
        <ExperienceSection />
      </section>

      <TestimonialSection />
      <NewsletterSection />
    </main>
  );
}
