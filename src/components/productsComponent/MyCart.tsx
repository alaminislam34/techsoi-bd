"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import CommonWrapper from "../layout/CommonWrapper";
import OrderForm from "./OrderForm";
import { useGetCartProducts, useDeleteFromCart } from "@/api/hooks/useCart";

type CartItemDisplay = {
  id: number;
  product_id: number;
  name: string;
  price: number;
  img: string;
  qty: number;
  amount: number;
};

export default function MyCart() {
  const { data: cartResponse, isLoading, isError } = useGetCartProducts();
  const { mutate: deleteFromCart } = useDeleteFromCart();

  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const cartItems = cartResponse?.data || [];

  useEffect(() => {
    if (cartItems?.length > 0) {
      const newQuantities: Record<number, number> = {};
      cartItems.forEach((item: any) => {
        const safeQty = Number(item.quantity) || 1;
        newQuantities[item.id] = safeQty;
      });
      setQuantities(newQuantities);
    }
  }, [cartItems]);

  const increase = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const removeItem = (id: number) => {
    deleteFromCart(id);
    // Also clean up local quantity state
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  // Calculate total amount for OrderForm (optional improvement)
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => {
      const qty = quantities[item.id] ?? Number(item.quantity) ?? 1;
      return sum + (item.amount || 0) * qty;
    }, 0);
  }, [cartItems, quantities]);

  if (isLoading) {
    return (
      <CommonWrapper>
        <section className="py-10 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </section>
      </CommonWrapper>
    );
  }

  if (isError) {
    return (
      <CommonWrapper>
        <section className="py-10 text-center text-red-500">
          Error loading cart items. Please try again later.
        </section>
      </CommonWrapper>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CommonWrapper>
        <section className="py-10">
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-semibold mb-2">
              Your Cart is Empty
            </p>
            <p className="text-gray-500 mb-6">
              Start shopping to add products to your cart
            </p>
            <a
              href="/products"
              className="inline-block px-6 py-2.5 bg-[#2CACE2] text-white font-semibold rounded-lg hover:bg-[#1b9bd1] transition"
            >
              Continue Shopping
            </a>
          </div>
        </section>
      </CommonWrapper>
    );
  }

  return (
    <CommonWrapper>
      <section className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT – CART ITEMS */}
        <div className="lg:col-span-2 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">My Cart</h2>

          {/* Header - visible on desktop */}
          <div className="hidden md:grid grid-cols-12 text-sm text-gray-500 border-b pb-3 mb-4">
            <div className="col-span-1">Delete</div>
            <div className="col-span-6">Products</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Unit Price</div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item: any) => {
            // Safe quantity fallback
            const currentQty =
              quantities[item.id] ?? Number(item.quantity) ?? 1;

            return (
              <div
                key={item.id}
                className="grid md:grid-cols-12 gap-y-4 items-center py-6 border-b last:border-none"
                style={{ borderColor: "#E6E6E6" }}
              >
                {/* Delete Button */}
                <div className="md:col-span-1">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="md:col-span-6 flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-xl border overflow-hidden relative"
                    style={{ borderColor: "#EAF7FC" }}
                  >
                    <img
                      src={item.product?.main_image || "/images/monitor.jpg"}
                      alt={item.product?.name || "Product"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/monitor.jpg";
                      }}
                    />
                  </div>
                  <p className="font-medium text-gray-700">
                    {item.product?.name || "Product"}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="md:col-span-3 flex justify-center">
                  <div
                    className="flex items-center border border-[#2CACE2] rounded-lg px-3 py-1 gap-4"
                    style={{ color: "#808080" }}
                  >
                    <button
                      onClick={() => decrease(item.id)}
                      className="cursor-pointer"
                      disabled={currentQty <= 1}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold min-w-[2ch] text-center">
                      {String(currentQty).padStart(2, "0")}
                    </span>

                    <button
                      onClick={() => increase(item.id)}
                      className="cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div
                  className="md:col-span-2 text-right font-semibold"
                  style={{ color: "#2CACE2" }}
                >
                  ৳{(item.amount || 0).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT – ORDER SUMMARY / FORM */}
        <OrderForm
          cartItems={cartItems}
          quantities={quantities}
          // Optional: pass totalAmount if OrderForm needs it
          // totalAmount={totalAmount}
        />
      </section>
    </CommonWrapper>
  );
}
