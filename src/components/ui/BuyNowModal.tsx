"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type ProductItem = {
  product_id: number;
  quantity: number;
  amount: number;
};

type BuyNowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
};

export default function BuyNowModal({
  isOpen,
  onClose,
  products,
}: BuyNowModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!products || products.length === 0) {
      toast.error("No product selected");
      return;
    }

    try {
      const payload = {
        ...formData,
        products: products.map((p) => ({
          product_id: p.product_id,
          quantity: p.quantity,
          amount: p.amount,
        })),
      };
      console.log(payload);
      console.log("Payload to send:", payload);

      const response = await fetch("/api/pay/sslcommerz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data?.message || "Payment initialization failed";
        toast.error(message);
        return;
      }

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
      toast.error("Failed to place order");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative max-h-[90vh] overflow-y-auto w-full max-w-md bg-[#eef9fd] rounded-2xl border border-[#9ED9F2] p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold text-[#303030] mb-6">
            Your Order
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              {
                name: "name",
                label: "Full Name",
                placeholder: "Akash Frontend",
              },
              {
                name: "phone",
                label: "Phone number",
                placeholder: "01754576435",
              },
              {
                name: "email",
                label: "Email Address",
                placeholder: "akash@techsoibd.com",
              },
              { name: "address", label: "Address", placeholder: "Nikunjo" },
              { name: "city", label: "City", placeholder: "Dhaka" },
              {
                name: "postcode",
                label: "Postcode / ZIP",
                placeholder: "1200",
              },
            ].map((item, idx) => (
              <div key={idx}>
                <label className="text-sm text-gray-500">{item.label}</label>
                <input
                  type="text"
                  name={item.name}
                  value={formData[item.name as keyof typeof formData]}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#9ED9F2]"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full cursor-pointer mt-4 bg-primary hover:bg-[#25a1d3] text-white py-3 rounded-xl font-medium"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
