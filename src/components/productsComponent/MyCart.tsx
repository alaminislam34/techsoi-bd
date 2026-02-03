"use client";

import { useState, useEffect, useMemo } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { Trash2, Minus, Plus } from "lucide-react";
import CommonWrapper from "../layout/CommonWrapper";
import OrderForm from "./OrderForm";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import { toast } from "react-toastify";

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
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getClientToken = () => {
    if (typeof window === "undefined") {
      return undefined;
    }

    return window.localStorage.getItem("accessToken");
  };

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await apiClient.request<any[]>(API_ENDPOINTS.CART_PRODUCT_GET, {
        auth: true,
        method: "GET",
      });

      setCartItems(response?.data || []);
    } catch (error: any) {
      console.error("Failed to fetch cart items:", error);
      toast.error(error?.message || "Failed to load cart");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (cartItems?.length > 0) {
      const newQuantities: Record<number, number> = {};
      cartItems.forEach((item: any) => {
        // API doesn't return quantity, default to 1
        newQuantities[item.id] = 1;
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

  const removeItem = async (id: number) => {
    try {
      await apiClient.request(API_ENDPOINTS.CART_PRODUCT_DELETE(id), {
        auth: true,
        method: "DELETE",
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
      toast.success("Item removed from cart");
    } catch (error: any) {
      console.error("Failed to remove cart item:", error);
      toast.error(error?.message || "Failed to remove item");
    }
  };

  // Calculate total amount for OrderForm
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => {
      const product = item.product?.[0];
      const price =
        Number(product?.sale_price) || Number(product?.regular_price) || 0;
      const qty = quantities[item.id] ?? 1;
      return sum + price * qty;
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
      <section className="py-6 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* LEFT – CART ITEMS */}
        <div className="lg:col-span-2 border border-blue-200 rounded-xl md:rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">My Cart</h2>

          {/* Header - visible on desktop */}
          <div className="hidden md:grid grid-cols-12 text-sm text-gray-500 border-b pb-3 mb-4">
            <div className="col-span-1">Delete</div>
            <div className="col-span-6">Products</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Unit Price</div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item: any) => {
            const product = item.product?.[0]; // Product is an array
            const price =
              Number(product?.sale_price) ||
              Number(product?.regular_price) ||
              0;
            const currentQty = quantities[item.id] ?? 1;

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-y-4 items-start md:items-center py-4 md:py-6 border-b last:border-none"
                style={{ borderColor: "#E6E6E6" }}
              >
                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-3">
                  {/* Product Info with Delete Button */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-20 h-20 shrink-0 rounded-lg border overflow-hidden relative"
                      style={{ borderColor: "#EAF7FC" }}
                    >
                      <SafeImage
                        src={product?.main_image}
                        alt={product?.name }
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-700 line-clamp-2 mb-2">
                        {product?.name }
                      </p>
                      <p className="text-primary font-bold text-base">
                        ৳{price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Quantity and Total */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center border border-[#2CACE2] rounded-lg px-2 py-1 gap-3"
                      style={{ color: "#808080" }}
                    >
                      <button
                        onClick={() => decrease(item.id)}
                        className="cursor-pointer disabled:opacity-50"
                        disabled={currentQty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold min-w-[2ch] text-center text-sm">
                        {String(currentQty).padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => increase(item.id)}
                        className="cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Subtotal</p>
                      <p className="font-bold text-primary text-base">
                        ৳{(price * currentQty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <>
                  {/* Delete Button */}
                  <div className="hidden md:block md:col-span-1">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="hidden md:flex md:col-span-6 items-center gap-4">
                    <div
                      className="w-20 h-20 shrink-0 rounded-xl border overflow-hidden relative"
                      style={{ borderColor: "#EAF7FC" }}
                    >
                      <SafeImage
                        src={product?.main_image}
                        alt={product?.name }
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-medium text-gray-700 line-clamp-2">
                      {product?.name }
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="hidden md:flex md:col-span-3 justify-center">
                    <div
                      className="flex items-center border border-[#2CACE2] rounded-lg px-3 py-1 gap-4"
                      style={{ color: "#808080" }}
                    >
                      <button
                        onClick={() => decrease(item.id)}
                        className="cursor-pointer disabled:opacity-50 transition-opacity"
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
                    className="hidden md:block md:col-span-2 text-right font-semibold"
                    style={{ color: "#2CACE2" }}
                  >
                    ৳{(price * currentQty).toLocaleString()}
                  </div>
                </>
              </div>
            );
          })}
        </div>

        {/* RIGHT – ORDER SUMMARY / FORM */}
        <OrderForm
          cartItems={cartItems}
          quantities={quantities}
          totalAmount={totalAmount}
        />
      </section>
    </CommonWrapper>
  );
}
