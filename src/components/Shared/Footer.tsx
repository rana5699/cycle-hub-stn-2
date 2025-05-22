import Link from "next/link";
import {
  Bike,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Road Bikes",
    image: "https://i.ibb.co/qLtFv0Tr/images.jpg",
    link: "/products/category/road-bikes",
  },
  {
    name: "Mountain Bikes",
    image: "https://i.ibb.co/1JLg2nB5/images-1.jpg",
    link: "/products/category/mountain-bikes",
  },
  {
    name: "Electric Bikes",
    image: "https://i.ibb.co/hFvDkYdQ/images-2.jpg",
    link: "/products/category/electric-bikes",
  },
  {
    name: "Hybrid Bikes",
    image: "https://i.ibb.co/RpW1xrn8/images-3.jpg",
    link: "/products/category/helmets",
  },
  {
    name: "BMX Bikes",
    image: "https://i.ibb.co/cSQ9z8Dv/images-4.jpg",
    link: "/products/category/accessories",
  },
  {
    name: "Accessories",
    image: "https://i.ibb.co/spZpPKTz/yamaha-bike-accessories.jpg",
    link: "/products/category/apparel",
  },
];


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Bike className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent">
                CycleHub
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium bicycles and accessories for every type of rider. Quality,
              performance, and style for your cycling journey.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-teal-500" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-teal-500" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-teal-500" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-gray-400 hover:text-teal-500" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-teal-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-teal-500 transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-teal-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-teal-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.link}
                    className="text-gray-400 hover:text-teal-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-500 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  Mohishbathan, Rajshahi
                  <br />
                  Biketown, BT 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-3" />
                <span className="text-gray-400">01751159833</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-3" />
                <span className="text-gray-400">ranaot56@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 justify-center text-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CycleHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
