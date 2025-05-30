"use client";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

import ProfileMenu from "@/components/Shared/Profile/ProfileMenu";
import { getActiveUser } from "@/utils/getAvtiveUser";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: Home },
  { name: "Products", href: "/dashboard/admin/products", icon: Package },
  { name: "Orders", href: "/dashboard/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/admin/customers", icon: Users },
  { name: "Profile", href: "/dashboard/admin/profile", icon: Users },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

// user navItems
const userNavItems = [
  {
    name: "Orders  History",
    href: "/dashboard/user/orders",
    icon: ShoppingCart,
  },
  { name: "Profile", href: "/dashboard/user/profile", icon: Users },
  { name: "Settings", href: "/dashboard/user/settings", icon: Settings },
];
const AdminNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();
  const user = getActiveUser();

  return (
    <div className="">
      {" "}
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden md:flex flex-col border-r bg-card"
        initial={{ width: 240 }}
        animate={{ width: isCollapsed ? 80 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex h-14 items-center px-4 py-4 border-b">
          {!isCollapsed && (
            <motion.h2
              className="text-lg font-bold gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {user && user?.role === "admin"
                ? "CycleHub Admin"
                : user && user?.role === "customer"
                ? "CycleHub User"
                : "CycleHub"}
            </motion.h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", isCollapsed && "mx-auto")}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {user &&
            user?.role === "admin" &&
            navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "gradient-bg text-white"
                    : "hover:bg-muted"
                )}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}

          {user &&
            user?.role === "customer" &&
            userNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "gradient-bg text-white"
                    : "hover:bg-muted"
                )}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
        </nav>

        <div className="flex items-center justify-between p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            Home
            <span>
              <Home size={20} />
            </span>
          </Link>
        </div>
      </motion.aside>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="p-0 w-64 flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex h-14 items-center px-4 border-b">
              <h2 className="text-lg font-bold gradient-text">
                CycleHub Admin
              </h2>
            </div>

            {/* Navigation Links */}
            <nav className="p-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "gradient-bg text-white"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <ProfileMenu />
          </div>

          {/* Footer */}
          <SheetFooter className="p-4 border-t space-y-3">
            <ProfileMenu />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminNavbar;
