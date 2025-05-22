"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

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

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["01751159833", "01619830567"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["ranaot56@gmail.com", "support@cyclehub.com"],
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Mohishbathan, Rajshahi", "Cycling City, CC 12345"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday-Friday: 9AM-6PM", "Saturday: 10AM-4PM", "Sunday: Closed"],
    },
  ]

  const faqs = [
    {
      question: "Do you offer bike repairs?",
      answer:
        "Yes, we offer comprehensive bike repair services including tune-ups, brake adjustments, gear servicing, wheel truing, and complete overhauls. Our certified technicians can work on all types of bikes.",
    },
    {
      question: "What brands do you carry?",
      answer:
        "We carry a wide range of premium brands including Trek, Specialized, Giant, Cannondale, Santa Cruz, and many more. We're constantly updating our inventory to bring you the best selection.",
    },
    {
      question: "Do you offer bike fitting services?",
      answer:
        "Yes, we provide professional bike fitting services to ensure your bike is perfectly adjusted to your body dimensions and riding style. This service helps prevent injuries and enhances performance.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in original packaging. Bikes can be returned within 14 days if they haven't been ridden outdoors. Custom orders are non-returnable.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please contact us for specific shipping information for your country.",
    },
  ]

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl gradient-text mb-6">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products, services, or just want to say hello? We&apos;d love to hear from you. Reach
            out to us using any of the methods below.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full gradient-bg mb-4">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-6">Send Us a Message</h2>
            <Card>
              <CardContent className="p-6">
                {submitSuccess ? (
                  <motion.div
                    className="text-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-3 rounded-full gradient-bg inline-flex mb-4">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-bg gradient-bg-hover" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-6">Find Us</h2>
            <Card className="overflow-hidden">
              <div className="relative h-[400px] w-full">
                <Image src="/placeholder.svg?height=400&width=600" alt="Map location" fill className="object-cover" />
                {/* This would be replaced with an actual map component */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <MapPin className="h-6 w-6 text-navy-blue" />
                    <p className="font-bold">CycleHub Store</p>
                    <p className="text-sm">123 Bike Lane, Cycling City</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl gradient-text">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to our most commonly asked questions. If you don&apos;t see what you&apos;re looking for, feel free to
            contact us directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="rounded-lg p-8 gradient-bg text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Join Our Cycling Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest product updates, cycling tips, and exclusive offers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Input
            placeholder="Your email address"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Button className="bg-white text-navy-blue hover:bg-gray-100">Subscribe</Button>
        </div>
      </motion.section>
    </div>
  )
}
