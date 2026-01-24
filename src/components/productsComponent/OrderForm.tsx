"use client";

import { useState } from "react";
import { useSslcommerzPayment } from "@/api/hooks/useSslcommerzPayment";
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
}: {
  cartItems: any[];
  quantities: Record<number, number>;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.amount || 0);
  }, 0);

  const tax = Math.round(subtotal * 0.05); // 5% tax
  const shipping = 100; // Fixed shipping
  const total = subtotal + tax + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build products payload from cart items
    const products = (cartItems || [])
      .map((item: any) => {
        const qty = quantities[item.id] ?? Number(item.quantity) ?? 1;
        const pid = Number(item.product_id ?? item.product?.id);
        const amt = Number(item.amount) || 0;
        return {
          product_id: pid,
          quantity: qty,
          amount: amt,
        };
      })
      .filter((p) => Number.isFinite(p.product_id) && p.product_id > 0 && p.quantity > 0);

    if (products.length === 0) {
      toast.error("Your cart is empty or invalid.");
      return;
    }

    const payload = {
      name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      postcode: formData.postcode.trim(),
      products,
    };

    if (!payload.name || !payload.phone || !payload.address || !payload.city || !payload.postcode) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Call payment API
    mutate(payload, {
      onSuccess: (data: any) => {
        toast.success("Redirecting to payment...");
        const redirectUrl =
          data?.redirect_url || data?.url || data?.GatewayPageURL || data?.payment_url;
        if (redirectUrl && typeof window !== "undefined") {
          window.location.href = redirectUrl;
        }
      },
      onError: (err: any) => {
        toast.error(err?.message || "Payment initialization failed.");
      },
    });
  };
  const { mutate, isPending } = useSslcommerzPayment();
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
          placeholder="Mr. Jhon Don"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          label="Phone number"
          placeholder="+888 0000 0000"
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
          placeholder="Dhaka"
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
          placeholder="1222"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
        />

        <button
          type="submit"
          className={`w-full mt-6 bg-[#2CACE2] cursor-pointer text-white py-4 rounded-xl font-semibold hover:bg-sky-600 transition ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
