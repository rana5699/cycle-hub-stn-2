"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TitleContainer from "@/components/Shared/TitleContainer/TitleContainer";

export default function OffersSection() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 0,
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12">
      <div className="container">
        {/* <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold md:text-4xl gradient-text mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Special Offers
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Take advantage of these limited-time deals and save on your next purchase.
          </motion.p>
        </div> */}

        <TitleContainer
          title=" Special Offers"
          description="Take advantage of these limited-time deals and save on your next purchase."
        />

        {/* Featured Offer */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://i.ibb.co/pj9QXqmt/special-offer-comic-style-template-44695-320.jpg"
                  alt="Flash Sale"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-white text-black">
                  50% OFF
                </Badge>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">
                  Flash Sale: Road Bikes
                </h3>
                <p className="text-muted-foreground mb-4">
                  For a limited time only, get 50% off on select road bikes.
                  Don&apos;t miss this incredible opportunity to upgrade your
                  ride at an unbeatable price.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Offer ends in:</p>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="bg-muted rounded-md p-2 font-mono text-xl font-bold">
                        {timeLeft.days.toString().padStart(2, "0")}
                      </div>
                      <p className="text-xs mt-1">Days</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-muted rounded-md p-2 font-mono text-xl font-bold">
                        {timeLeft.hours.toString().padStart(2, "0")}
                      </div>
                      <p className="text-xs mt-1">Hours</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-muted rounded-md p-2 font-mono text-xl font-bold">
                        {timeLeft.minutes.toString().padStart(2, "0")}
                      </div>
                      <p className="text-xs mt-1">Mins</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-muted rounded-md p-2 font-mono text-xl font-bold">
                        {timeLeft.seconds.toString().padStart(2, "0")}
                      </div>
                      <p className="text-xs mt-1">Secs</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 justify-between items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Use code:</p>
                    <div className="bg-muted p-2 rounded-md font-mono text-center">
                      FLASH50
                    </div>
                  </div>
                  <Link href="/offered" className="flex-1">
                    <Button className="w-full gradient-bg gradient-bg-hover  sm:mt-auto">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
