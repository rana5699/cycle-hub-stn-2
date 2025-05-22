"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award, Clock, Heart, Shield, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }


  const testimonials = [
    {
      name: "David Miller",
      role: "Mountain Biking Enthusiast",
      quote:
        "CycleHub has completely transformed my biking experience. Their expert advice and quality products have taken my riding to the next level.",
      rating: 5,
    },
    {
      name: "Lisa Taylor",
      role: "Commuter Cyclist",
      quote:
        "I've been shopping at CycleHub for years and their customer service is unmatched. They always go above and beyond to help me find exactly what I need.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Professional Cyclist",
      quote:
        "As a professional, I need equipment I can rely on. CycleHub consistently delivers top-quality products that perform when it matters most.",
      rating: 5,
    },
  ]

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <motion.h1
              className="text-4xl font-bold md:text-5xl lg:text-6xl gradient-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Story
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Founded in 2010, CycleHub began with a simple mission: to make cycling accessible, enjoyable, and
              sustainable for everyone. What started as a small repair shop has grown into a comprehensive cycling
              destination, offering everything from premium bikes to expert advice and community events.
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our passion for cycling drives everything we do. We believe that bikes aren&apos;t just a mode of
              transportation—they&apos;re a lifestyle, a community, and a path to a healthier planet.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/products">
                <Button className="gradient-bg gradient-bg-hover">
                  Explore Our Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="https://i.ibb.co/tjwZXy9/TLR-Majors-Eaglehawks-Sports-Mar23-1024x683.jpg"
              alt="CycleHub store"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl gradient-text">Our Values</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            At CycleHub, we&apos;re guided by core principles that shape everything from our product selection to our
            customer service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Passion for Cycling",
              description: "We love cycling and are committed to sharing that passion with our community.",
            },
            {
              icon: Shield,
              title: "Quality & Reliability",
              description: "We stand behind every product we sell with expert knowledge and support.",
            },
            {
              icon: Award,
              title: "Expertise",
              description: "Our team consists of cycling enthusiasts with deep knowledge and experience.",
            },
            {
              icon: Truck,
              title: "Service Excellence",
              description: "From repairs to advice, we provide outstanding service at every touchpoint.",
            },
            {
              icon: Clock,
              title: "Sustainability",
              description: "We're committed to promoting cycling as a sustainable transportation option.",
            },
            {
              icon: Star,
              title: "Community",
              description: "We foster a welcoming community for cyclists of all levels and backgrounds.",
            },
          ].map((value, i) => (
            <motion.div
              key={value.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full gradient-bg mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

     

      {/* Testimonials Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl gradient-text">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our community has to say about their CycleHub experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-amber fill-amber" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="italic mb-6">&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="rounded-lg p-8 gradient-bg text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cycling Journey?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Whether you&apos;re a beginner or a seasoned pro, we have everything you need to enhance your cycling experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products">
            <Button className="bg-white text-navy-blue hover:bg-gray-100">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="text-navy-blue hover:bg-gray-100 ">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
