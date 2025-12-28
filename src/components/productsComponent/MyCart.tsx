"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";

import CamImg from "@/assets/reviewImg/fav1.jpg";
import CommonWrapper from "../layout/CommonWrapper";
import OrderForm from "./OrderForm";

type CartItem = {
  id: number;
  name: string;
  price: number;
  img: StaticImageData;
  qty: number;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "A donut dressed up as a Smart Assistant",
    price: 3600,
    img: CamImg,
    qty: 1,
  },
  {
    id: 2,
    name: "A donut dressed up as a Smart Assistant",
    price: 3600,
    img: CamImg,
    qty: 1,
  },
  {
    id: 3,
    name: "A donut dressed up as a Smart Assistant",
    price: 3600,
    img: CamImg,
    qty: 1,
  },
];

export default function MyCart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CommonWrapper>
      <section className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT – CART */}
        <div className="lg:col-span-2 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">My Cart</h2>

          {/* Header */}
          <div className="hidden md:grid grid-cols-12 text-sm text-gray-500 border-b pb-3 mb-4">
            <div className="col-span-1">Delete</div>
            <div className="col-span-6">Products</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Unit Price</div>
          </div>

          {/* Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid md:grid-cols-12 gap-y-4 items-center py-6 border-b last:border-none"
              style={{ borderColor: "#E6E6E6" }} // ✅ divider color
            >
              {/* Delete */}
              <div className="md:col-span-1">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Product */}
              <div className="md:col-span-6 flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl border overflow-hidden relative"
                  style={{ borderColor: "#EAF7FC" }} // ✅ image border color
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-medium text-gray-700">{item.name}</p>
              </div>

              {/* Quantity */}
              <div className="md:col-span-3 flex justify-center">
                <div
                  className="flex items-center border border-[#2CACE2] rounded-lg px-3 py-1 gap-4"
                  style={{ color: "#808080" }} // ✅ qty color
                >
                  <button
                    onClick={() => decrease(item.id)}
                    className="cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold">
                    {item.qty.toString().padStart(2, "0")}
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
                style={{ color: "#2CACE2" }} // ✅ unit price color
              >
                ৳{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – ORDER FORM */}
        <OrderForm />
      </section>
    </CommonWrapper>
  );
}
