"use client";

import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TitleContainer from "@/components/Shared/TitleContainer/TitleContainer";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Mountain Biking Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The Mountain Explorer Pro exceeded all my expectations. The handling on rough terrain is exceptional, and the build quality is top-notch. Customer service was also outstanding when I had questions about maintenance.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Daily Commuter",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I've been using the Urban Glide E-Bike for my daily commute for 6 months now, and it has transformed my journey to work. Battery life is excellent, and the bike is comfortable even on longer rides.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Professional Cyclist",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As someone who competes regularly, I need equipment I can rely on. The Road Master Carbon is lightweight, responsive, and has helped me improve my race times. Worth every penny!",
    rating: 4,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Weekend Rider",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The customer service at CycleHub is unmatched. They helped me find the perfect bike for weekend trails and provided excellent follow-up support. The Pro Racing Helmet I purchased is comfortable and feels very secure.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Patel",
    role: "Family Cyclist",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "We bought bikes for the whole family, and the experience was fantastic from start to finish. The staff was patient with our kids and helped us find the perfect fit for everyone. The accessories selection is also impressive.",
    rating: 4,
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToTestimonial(currentIndex + 1);
    }
  };

  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToTestimonial(currentIndex - 1);
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (scrollRef.current) {
      const testimonialWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: testimonialWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-muted mt-8">
      <div className="container  mt-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
           <TitleContainer
          title="What Our Customers Say"
          description="Hear from cyclists who have experienced the CycleHub difference"
        />
        </div>

       

        <div className="relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md"
              onClick={prevTestimonial}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x scrollbar-hide"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-full snap-center px-4"
              >
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} />
                          <AvatarFallback>
                            {testimonial.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "fill-amber text-amber"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-lg italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md"
              onClick={nextTestimonial}
              disabled={currentIndex === testimonials.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToTestimonial(index);
              }}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-teal-500" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
