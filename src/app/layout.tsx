import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/Module/Providers/CartProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CycleHub - Premium Bicycle Store",
  description:
    "Find the perfect bicycle for your adventures. Quality bikes, accessories, and gear for all riders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            {/* <Navbar /> */}
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
            <Toaster />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
