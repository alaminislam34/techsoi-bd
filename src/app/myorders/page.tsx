"use client";

import Image, { StaticImageData } from "next/image";
import { Eye, Download } from "lucide-react";
import { useState } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";

import OrderImg from "@/assets/reviewImg/fav1.jpg";
import ReviewModal from "@/components/ui/ReviewModal";

type OrderItem = {
  id: number;
  name: string;
  img: StaticImageData | string;
  date: string;
  qty: number;
  price: number;
  status: "On Progress" | "Completed" | "Cancelled";
};

const orders: OrderItem[] = [
  {
    id: 1,
    name: "A donut dressed up as a Smart Assistant",
    img: OrderImg,
    date: "September 15, 2024",
    qty: 1,
    price: 3600,
    status: "On Progress",
  },
  {
    id: 2,
    name: "A donut dressed up as a Smart Assistant",
    img: OrderImg,
    date: "September 15, 2024",
    qty: 2,
    price: 3600,
    status: "Completed",
  },
  {
    id: 3,
    name: "A donut dressed up as a Smart Assistant",
    img: OrderImg,
    date: "September 15, 2024",
    qty: 2,
    price: 3600,
    status: "Cancelled",
  },
];

const statusStyles = {
  "On Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function MyOrdersPage() {
  const [openReview, setOpenReview] = useState(false);

  return (
    <CommonWrapper>
      <section className="py-10">
        <div className="bg-white border border-blue-200 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 text-gray-500 text-sm font-medium border-b pb-4">
            <div className="col-span-4">Products</div>
            <div className="col-span-2">Order Placed</div>
            <div className="col-span-1">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Invoice</div>
          </div>

          {/* Orders */}
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-0 items-center py-6 border-b "
              style={{ borderColor: "#E6E6E6" }} 
            >
              {/* Product */}
              <div className="md:col-span-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden relative shrink-0">
                  <Image
                    src={order.img}
                    alt={order.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  {order.name}
                </p>
              </div>

              {/* Date */}
              <div className="md:col-span-2 text-sm text-gray-600">
                {order.date}
              </div>

              {/* Quantity */}
              <div className="md:col-span-1 font-medium text-gray-700">
                {order.qty}
              </div>

              {/* Price */}
              <div className="md:col-span-2" style={{ color: "#2CACE2", fontWeight: 600 }}>
                ৳{order.price}
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Invoice */}
              <div className="md:col-span-1 flex md:justify-end gap-3 text-blue-500">
                <button
                  aria-label="View invoice"
                  className="cursor-pointer"
                  onClick={() => setOpenReview(true)}
                >
                  <Eye size={18} />
                </button>

                <button aria-label="Download invoice">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={openReview}
        onClose={() => setOpenReview(false)}
      />
    </CommonWrapper>
  );
}
