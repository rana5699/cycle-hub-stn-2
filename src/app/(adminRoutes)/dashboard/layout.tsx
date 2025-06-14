import type { Metadata } from "next";
import "../../globals.css";
import AdminNavbar from "@/components/Module/Dashboard/Admin/AdminNavbar";
import { Toaster } from "sonner";


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
    <div className="flex min-h-screen">
      <AdminNavbar />
      <main className="flex-1  mt-6 py-5 px-5 md:px-5">{children}</main>
      <Toaster />
    </div>
  );
}
