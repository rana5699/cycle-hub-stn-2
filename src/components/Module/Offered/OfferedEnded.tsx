"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertCircle, Bell, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface OfferEndedProps {
  offerTitle?: string;
  originalDiscount?: string;
  endDate?: string;
  showNotificationSignup?: boolean;
  recommendedOffers?: Array<{
    id: string;
    title: string;
    discount: string;
    validUntil: string;
    category: string;
  }>;
  onClose?: () => void;
  className?: string;
}

export default function OfferEnded({
  offerTitle = "Summer Sale",
  originalDiscount = "50% OFF",
  showNotificationSignup = true,
  onClose,
  className = "",
}: OfferEndedProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotificationSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-full max-w-4xl mx-auto ${className}`}
    >
      <Card className="overflow-hidden  gradient-bg">
        {/* Header */}
        <CardHeader className="relative gradient-bg text-white">
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Offer Has Ended</h2>
              <p className="text-white/90">
                This promotion is no longer available
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Ended Offer Details */}
          <motion.div
            className="text-center py-6 border-2 border-gradient-to-r from-teal-50 to-navy-blue-50 rounded-lg bg-white/50"
            variants={itemVariants}
            custom={0}
          >
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 gradient-bg mr-2" />
              <Badge className="text-lg px-4 py-2 gradient-bg">
                {originalDiscount}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold gradient-text mb-2">
              {offerTitle}
            </h3>
            <p className="text-gray-600">
              This offer ended on{" "}
              <span className="font-medium">May 25, 2025</span>
            </p>
          </motion.div>

          {/* Notification Signup */}
          {showNotificationSignup && (
            <motion.div
              variants={itemVariants}
              custom={1}
              className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-200"
            >
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-teal-600 mr-2" />
                <h4 className="text-lg gradient-text font-semibold text-gray-800">
                  Never Miss Another Deal
                </h4>
              </div>
              <p className="text-gray-600 mb-4">
                Get notified about future sales and exclusive offers before they
                go live.
              </p>

              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleNotificationSignup}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      className=" text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue hover:text-white"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notify Me
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center py-3 bg-green-100 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center text-green-700">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      </div>
                      <span className="font-medium">
                        You&lsquo;re all set! We&apos;ll notify you about future
                        offers.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="">
          <div className="flex flex-col  w-full">
            <Link href="/products" className="flex-1">
              <Button
                variant="outline"
                className="w-full text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue hover:text-white"
              >
                Browse All Products
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
