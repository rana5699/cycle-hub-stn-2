"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Bike,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useCart } from "../Module/Providers/CartProvider";
import CartDrawer from "../Module/Cart/CartDrawer";
import ProfileMenu from "./Profile/ProfileMenu";
import SearchProducts from "./SearchProducts/SearchProducts";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      isScrolled
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2"
        : "bg-transparent py-4"
    }
  `;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products", hasSubmenu: true },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    {
      name: "Road Bikes",
      icon: <Bike className="w-5 h-5 mr-2" />,
      href: "/products",
    },
    {
      name: "Mountain Bikes",
      icon: <Bike className="w-5 h-5 mr-2" />,
      href: "/products",
    },
    {
      name: "Electric Bikes",
      icon: <Bike className="w-5 h-5 mr-2" />,
      href: "/products",
    },
    {
      name: "Hybrid Bikes",
      icon: <Bike className="w-5 h-5 mr-2" />,
      href: "/products",
    },
    {
      name: "BMX Bikes",
      icon: <Bike className="w-5 h-5 mr-2" />,
      href: "/products",
    },
    {
      name: "Accessories",
      icon: <PenTool className="w-5 h-5 mr-2" />,
      href: "/products/category/accessories",
    },
  ];



  return (
    <header className={navbarClasses}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Bike className="w-8 h-8 text-teal-500" />
          <span className="text-xl font-bold gradient-text">CycleHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-1 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) =>
                link.hasSubmenu ? (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuTrigger
                      className={
                        pathname?.startsWith(link.href) ? "text-teal-500" : ""
                      }
                    >
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center p-3 rounded-md hover:bg-muted"
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="items-center hidden space-x-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="relative"
                variant="ghost"
                size="icon"
                aria-label="Cart"
              >
                <ShoppingCart height={8} width={8} className="w-6 h-8" />
                {cartItems.length > 0 && (
                  <Badge className="absolute flex items-center justify-center bg-teal-500 -right-1 -top-2">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <CartDrawer />
            </SheetContent>
          </Sheet>

          <ProfileMenu />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="relative"
                variant="ghost"
                size="icon"
                aria-label="Cart"
              >
                <ShoppingCart height={8} width={8} className="w-6 h-8" />
                {cartItems.length > 0 && (
                  <Badge className="absolute flex items-center justify-center bg-teal-500 -right-1 -top-2">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <CartDrawer />
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 p-4 bg-white shadow-md top-full dark:bg-gray-900"
          >
            <SearchProducts setIsSearchOpen={setIsSearchOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 overflow-hidden bg-white shadow-md md:hidden top-full dark:bg-gray-900"
          >
            <div className="container flex flex-col py-4 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasSubmenu ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          className={`text-lg ${
                            pathname === link.href
                              ? "text-teal-500 font-medium"
                              : ""
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                      <div className="pl-4 space-y-2 border-l-2 border-muted">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-lg ${
                        pathname === link.href
                          ? "text-teal-500 font-medium"
                          : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="flex items-center pt-2 space-x-4 border-t">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setIsMobileMenuOpen(false);
                  }}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </Button>

                <ProfileMenu />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
