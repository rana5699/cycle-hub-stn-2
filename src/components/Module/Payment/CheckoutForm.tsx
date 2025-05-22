/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SFormInput from "@/components/Shared/Form/SFormInput";
import { getActiveUser } from "@/utils/getAvtiveUser";
import { toast } from "@/hooks/use-toast";
import { createPaymentIntent } from "@/actions/Payment";
import {  useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ cartItems }: { cartItems: any }) {
  const form = useForm({
    defaultValues: {
      city: "",
      country: "",
      phoneNumber: "",
    },
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const user = getActiveUser();

  //   console.log(cartItems,"cartItems")

  const handleSubmit = async (data: any) => {
    setIsLoading(true);

    const orderData = {
      userId: user?.userId,
      products: cartItems?.map((item: any) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      address: {
        city: data.city,
        country: data.country,
      },
      phoneNumber: data.phoneNumber,
    };

    try {
      const res = await createPaymentIntent(orderData);

      if (res.success) {
        router.push(res?.data?.checkout_url);
        setIsLoading(false);
        toast({
          title: "Success",
          description: res.message,
          variant: "default",
        });

        console.log(res)
      } else {
        setIsLoading(false);
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <motion.form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-2">
            <SFormInput
              control={form.control}
              name="city"
              placeholder="City Name"
              label="City Name"
            />
          </div>

          <div className="space-y-2">
            <SFormInput
              control={form.control}
              name="country"
              placeholder="Country Name"
              label="Country Name"
            />
          </div>

          <div className="space-y-2">
            <SFormInput
              control={form.control}
              name="phoneNumber"
              placeholder="Your number"
              label="Your number"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </motion.form>
      </Form>
    </motion.div>
  );
}
