import { getAllProducts } from "@/actions/ptoducts";
import CategorySection from "@/components/Module/Category/CategorySection";
import ExperienceSection from "@/components/Module/Home/ExperienceSection";
import HeroSlider from "@/components/Module/Home/HeroSlider";
import NewsletterSection from "@/components/Module/Home/NewletterSection";
import OffersSection from "@/components/Module/Home/OfferedSection";
import FeaturedProducts from "@/components/Module/Products/FeaturedProducts/FeaturedProducts";
import TestimonialSection from "@/components/Module/TestimonialSection/TestimonialSection";
import TitleContainer from "@/components/Shared/TitleContainer/TitleContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  const { data: products } = await getAllProducts();

  // console.log(products);

  return (
    <main className="flex-1">
      <HeroSlider products={products} />

      <section className="container py-12 md:py-20">
        <TitleContainer
          title="Shop by Category"
          description="Explore our wide range of bicycles and accessories for every type of rider"
        />
        <CategorySection products={products} />
      </section>

      <section className="container mt-3">
        <div className="flex flex-col items-center justify-center text-center">
          <TitleContainer
            title="Featured Products"
            description="Discover our top-rated bicycles and accessories"
          />
        </div>
        <FeaturedProducts products={products} />
        <div className="flex justify-center mt-8">
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

      <section className="container mt-3 ">
        <OffersSection />
      </section>

      <section className="container mt-3 ">
        <ExperienceSection />
      </section>

      <section className="container mt-3 ">
        <TestimonialSection />
      </section>
      <section className="container mt-3">
        <NewsletterSection />
      </section>
    </main>
  );
}
