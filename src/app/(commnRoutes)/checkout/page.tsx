"use client";
import CheckoutForm from "@/components/Module/Payment/CheckoutForm";
import { useCart } from "@/components/Module/Providers/CartProvider";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  return (
    <div className="container py-12 max-w-2xl my-20">
      <h3 className="text-lg font-bold">Shipping Information</h3>
      <CheckoutForm cartItems={cartItems} />
    </div>
  );
};

export default CheckoutPage;
