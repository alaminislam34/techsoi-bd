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

          {/* Table Wrapper for Responsiveness */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm font-medium border-b">
                  <th className="text-left py-4">Products</th>
                  <th className="text-left py-4">Order Placed</th>
                  <th className="text-left py-4">Qty</th>
                  <th className="text-left py-4">Price</th>
                  <th className="text-left py-4">Status</th>
                  <th className="text-left py-4">Review</th>
                  <th className="text-right py-4">Invoice</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b"
                    style={{ borderColor: "#E6E6E6" }}
                  >
                    {/* Product */}
                    <td className="py-6">
                      <div className="flex items-center gap-4">
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
                    </td>

                    {/* Order Date */}
                    <td className="py-6 text-sm text-gray-600">
                      {order.date}
                    </td>

                    {/* Qty */}
                    <td className="py-6 font-medium text-gray-700">
                      {order.qty}
                    </td>

                    {/* Price */}
                    <td
                      className="py-6 font-semibold"
                      style={{ color: "#2CACE2" }}
                    >
                      ৳{order.price}
                    </td>

                    {/* Status */}
                    <td className="py-6">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Review */}
                    <td className="py-6">
                      <button
                        onClick={() => setOpenReview(true)}
                        className="text-sm font-medium cursor-pointer text-[#2CACE2] border border-[#2CACE2] px-4 py-1.5 rounded-lg hover:bg-blue-50 transition"
                      >
                        Review
                      </button>
                    </td>

                    {/* Invoice */}
                    <td className="py-6">
                      <div className="flex justify-end gap-3 text-[#2CACE2]">
                        <button aria-label="View invoice">
                          <Eye size={18} />
                        </button>
                        <button aria-label="Download invoice" className="text-[#2CACE2]">
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
