"use client";

import { useState } from "react";
import { useSslcommerzPayment } from "@/api/hooks/useSslcommerzPayment";
import { useCreateOrder } from "@/api/hooks/useOrders";
import { toast } from "react-toastify";

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ label, placeholder, name, value, onChange }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm block" style={{ color: "#808080" }}>
        {label}
      </label>

      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-3 bg-white focus:outline-none"
        style={{
          border: "1px solid #E6E6E6",
        }}
      />
    </div>
  );
}

export default function OrderForm({
  cartItems = [],
  quantities = {},
  totalAmount = 0,
}: {
  cartItems: any[];
  quantities: Record<number, number>;
  totalAmount?: number;
}) {
  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrder();
  const { mutateAsync: startPayment, isPending: isPaying } =
    useSslcommerzPayment();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  });

  // Calculate totals
  const subtotal =
    totalAmount ||
    cartItems.reduce((acc, item) => {
      const product = item.product?.[0];
      const price =
        Number(product?.sale_price) || Number(product?.regular_price) || 0;
      const qty = quantities[item.id] ?? 1;
      return acc + price * qty;
    }, 0);

  const tax = Math.round(subtotal * 0.05); // 5% tax
  const shipping = 100;
  const total = subtotal + tax + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Build products payload from cart items
    const products = (cartItems || [])
      .map((item: any) => {
        const product = item.product?.[0];
        const qty = quantities[item.id] ?? 1;
        const pid = Number(item.product_id);
        const price =
          Number(product?.sale_price) || Number(product?.regular_price) || 0;
        const amt = price * qty;
        return {
          product_id: pid,
          quantity: qty,
          amount: amt,
        };
      })
      .filter(
        (p) =>
          Number.isFinite(p.product_id) && p.product_id > 0 && p.quantity > 0,
      );

    if (products.length === 0) {
      toast.error("Your cart is empty or invalid");
      return;
    }

    try {
      const payload = {
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postcode: formData.postcode.trim(),
        products,
      };

      await createOrder(payload);

      const data: any = await startPayment(payload);

      const redirectUrl =
        data?.redirectUrl ||
        data?.redirect_url ||
        data?.GatewayPageURL ||
        data?.url ||
        data?.payment_url ||
        data?.location;

      if (redirectUrl && typeof window !== "undefined") {
        toast.success("Redirecting to payment gateway...");
        window.location.href = redirectUrl;
      } else {
        toast.error("No payment gateway URL found");
      }
    } catch (err: any) {
      console.error("API Error:", err.message);
      toast.error(err?.message || "Failed to place order");
    }
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "#EAF7FC",
        border: "1px solid #CFEAF8",
      }}
    >
      <h2 className="text-xl font-semibold mb-6">Your Order</h2>

      {/* Order Summary */}
      <div
        className="space-y-3 mb-6 pb-6 border-b"
        style={{ borderColor: "#CFEAF8" }}
      >
        <div className="flex justify-between text-sm">
          <span style={{ color: "#808080" }}>Subtotal</span>
          <span className="font-semibold" style={{ color: "#2CACE2" }}>
            ৳{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "#808080" }}>Tax (5%)</span>
          <span className="font-semibold" style={{ color: "#2CACE2" }}>
            ৳{tax.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "#808080" }}>Shipping</span>
          <span className="font-semibold" style={{ color: "#2CACE2" }}>
            ৳{shipping.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span style={{ color: "#2CACE2" }}>৳{total.toLocaleString()}</span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="Your full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          label="Phone number"
          placeholder="01XXXXXXXXX"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          label="Email Address"
          placeholder="yourmail@mail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Address"
          placeholder="address line"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <Input
          label="City"
          placeholder="Dhaka"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          label="Postcode / ZIP"
          placeholder="post code"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
        />

        <button
          type="submit"
          className={`w-full mt-6 bg-[#2CACE2] cursor-pointer text-white py-4 rounded-xl font-semibold hover:bg-sky-600 transition ${isCreatingOrder || isPaying ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={isCreatingOrder || isPaying}
        >
          {isCreatingOrder || isPaying ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
