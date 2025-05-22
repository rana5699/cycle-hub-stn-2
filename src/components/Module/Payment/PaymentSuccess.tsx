"use client";

import { useEffect,  } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  Check,
  ChevronRight,
  Download,
  Home,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PaymentSuccess() {
  // const searchParams = useSearchParams();
  // const orderId =
  //   searchParams.get("orderId") ||
  //   "ORD-" +
  //     Math.floor(Math.random() * 10000)
  //       .toString()
  //       .padStart(4, "0");
  // const [countdown, setCountdown] = useState(5);

  // Trigger confetti effect on page load
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Auto redirect countdown


  // Sample order data
  const orderDetails = {
    // id: orderId,
    date: new Date().toISOString(),
    total: 1299.99,
    items: [
      {
        name: "Mountain Bike Pro",
        price: 1299.99,
        quantity: 1,
      },
    ],
    estimatedDelivery: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container max-w-4xl py-12">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Confirmation</CardTitle>
              {/* <CardDescription>Order #{orderDetails}</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Delivery Information</h3>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    Estimated delivery: {orderDetails.estimatedDelivery}
                  </span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">What happens next?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span>
                      You will receive an order confirmation email with details
                      of your order.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span>
                      Once your order ships, you will receive tracking
                      information via email.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span>
                      You can check the status of your order at any time in your
                      account.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              {/* <Link
                href={`/account/purchase-history/${orderDetails.id}`}
                className="w-full sm:w-auto"
              > */}
                <Button className="w-full text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue">
                  <Package className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              {/* </Link> */}
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about your order, please contact our
                customer support team.
              </p>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="flex items-center text-navy-blue hover:underline"
                >
                  <ChevronRight className="mr-1 h-4 w-4" />
                  Contact Support
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-navy-blue hover:underline"
                >
                  <ChevronRight className="mr-1 h-4 w-4" />
                  FAQs
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-navy-blue hover:underline"
                >
                  <ChevronRight className="mr-1 h-4 w-4" />
                  Return Policy
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-bg text-white">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Continue Shopping</h3>
              <p className="mb-4">Explore more products in our collection.</p>
              <div className="flex flex-col">
                <Link href="/" className="w-full">
                  <Button className="w-full bg-white text-navy-blue hover:bg-gray-100">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                    {/* {countdown > 0 && (
                      <span className="ml-2">({countdown})</span>
                    )} */}
                  </Button>
                </Link>
                <Link href="/products" className="w-full mt-3">
                  <Button
                    variant="outline"
                    className="w-full border-white text-navy-blue hover:bg-gray-100"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

    </div>
  );
}
