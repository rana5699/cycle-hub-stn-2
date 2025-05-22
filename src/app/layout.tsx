import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import CartProvider from "@/components/Module/Providers/CartProvider"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CycleHub - Premium Bicycle Store",
  description: "Find the perfect bicycle for your adventures. Quality bikes, accessories, and gear for all riders.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         {/* <Provider store={store}> */}
           <CartProvider>
            <div className="relative flex flex-col min-h-screen">
              <Navbar />
              {children}
              <Toaster />
              <Footer />
              <Toaster />
            </div>
          </CartProvider>
         {/* </Provider> */}
      </body>
    </html>
  )
}
