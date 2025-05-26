/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Facebook, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SFormInput from "@/components/Shared/Form/SFormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { userLogin } from "@/actions/Auth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await userLogin(data);
      if (res.success) {
        setIsLoading(false);
        toast({
          title: "Success",
          description: res.message,
          variant: "default",
        });

        router.push("/");
      } else {
        setIsLoading(false);
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  const handleDemoLogin = async (type: "user" | "admin") => {
    const demoCredentials = {
      user: { email: "demouser@gmail.com", password: "user1234" },
      admin: { email: "admin@gmail.com", password: "admin123" },
    };

    const data = demoCredentials[type];
    if (!data) return;

    // Set form values
    form.setValue("email", data.email);
    form.setValue("password", data.password);

    // Optional: Wait for the values to update visually
    await new Promise((resolve) => setTimeout(resolve, 100)); // small delay for UX

    // Submit the form programmatically
    await handleSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

          <div className="flex items-center gap-4 py-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleDemoLogin("user")}
              disabled={isLoading}
            >
              Demo User
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleDemoLogin("admin")}
              disabled={isLoading}
            >
              Demo Admin
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-xs bg-background text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" disabled={isLoading}>
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Facebook
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
