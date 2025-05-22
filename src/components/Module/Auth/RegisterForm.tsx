/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SFormInput from "@/components/Shared/Form/SFormInput";
import { useForm } from "react-hook-form";
import { userRegister } from "@/actions/Auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await userRegister(data);

      if (res.success) {
        setIsLoading(false);
         router.push("/login");
        toast({
          title: "Success",
          description: res.message,
          variant: "default",
        })
      }
      else{
        setIsLoading(false);
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        })
      }
    } catch (error:any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <SFormInput
                control={form.control}
                name="firstName"
                placeholder="Enter your first name"
                label="First Name"
              />
            </div> */}
          <div className="space-y-2">
            <SFormInput
              control={form.control}
              name="name"
              placeholder="Enter your  name"
              label="Your Name"
            />
          </div>
          {/* </div> */}
          <div className="space-y-2">
            <SFormInput
              control={form.control}
              name="email"
              placeholder="Your email address"
              label="Your email"
            />
          </div>

          <div className="space-y-2">
            <SFormInput
              control={form.control}
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
