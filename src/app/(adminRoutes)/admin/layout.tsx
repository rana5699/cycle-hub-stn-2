import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import AdminNavbar from "@/components/Module/Dashboard/Admin/AdminNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CycleHub - Premium Bicycle Store",
  description:
    "Find the perfect bicycle for your adventures. Quality bikes, accessories, and gear for all riders.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <AdminNavbar />
          <main className="flex-1 mt-6 py-5 px-5 md:px-5">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
