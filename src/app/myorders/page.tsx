"use client";

import SafeImage from "@/components/ui/SafeImage";
import { Eye, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import ReviewModal from "@/components/ui/ReviewModal";
import { useGetUserOrders } from "@/api/hooks/useOrders"; // your hook

// Map API status numbers to display text & style
const mapApiStatusToDisplay = (status: number) => {
  switch (status) {
    case 1:
      return { text: "Completed", className: "bg-green-100 text-green-700" };
    case 2:
      return { text: "Cancelled", className: "bg-red-100 text-red-600" };
    default:
      return {
        text: "On Progress",
        className: "bg-yellow-100 text-yellow-700",
      };
  }
};

export default function MyOrdersPage() {
  const [openReview, setOpenReview] = useState(false);

  const {
    data: ordersResponse,
    isLoading,
    isError,
    error,
  } = useGetUserOrders();

  const orders = (ordersResponse?.data || []).map((order: any) => {
    const { text: statusText, className: statusClass } = mapApiStatusToDisplay(
      order.status || 0,
    );

    return {
      id: order.id,
      name: order.name || "Order #" + order.id,
      date: new Date(order.created_at || Date.now()).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      ),
      qty:
        order.order_details?.reduce(
          (sum: number, d: any) => sum + (d.quantity || 0),
          0,
        ) || 1,
      price: order.total_amount || 0,
      status: statusText,
      statusClass,
      img:
        order.order_details?.[0]?.product?.main_image || "/images/fallback-image.png"
    };
  });

  return (
    <CommonWrapper>
      <section className="py-10">
        <div className="bg-white border border-blue-200 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-12 w-12 text-primary" />
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16 text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4v2m-6-4h.01M9 15h.01m9-6h.01m-10.5 4.5h.01"
                  />
                </svg>
              </div>
              <p className="text-red-600 font-semibold mb-2">
                Error Loading Orders
              </p>
              <p className="text-gray-600 mb-4">
                {error?.message ||
                  "Something went wrong while loading your orders."}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Please check your internet connection and try again. If the
                problem persists, contact support.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-block px-6 py-2.5 bg-[#2CACE2] text-white font-semibold rounded-lg hover:bg-[#1b9bd1] transition"
              >
                Retry
              </button>
            </div>
          ) : orders.length === 0 ? (
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
              <p className="text-gray-600 font-semibold mb-2">No Orders Yet</p>
              <p className="text-gray-500 mb-6">
                You haven't placed any orders. Start shopping to see your orders
                here!
              </p>
              <a
                href="/products"
                className="inline-block px-6 py-2.5 bg-[#2CACE2] text-white font-semibold rounded-lg hover:bg-[#1b9bd1] transition"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-175 border-collapse">
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
                      className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: "#E6E6E6" }}
                    >
                      {/* Product */}
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden relative shrink-0">
                            <SafeImage
                              src={order.img}
                              fallbackSrc="/images/monitor.jpg"
                              alt={order.name}
                              width={80}
                              height={80}
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
                        ৳{order.price.toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="py-6">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${order.statusClass}`}
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
                          <button aria-label="Download invoice">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <ReviewModal
            isOpen={openReview}
            onClose={() => setOpenReview(false)}
          />
        </div>
      </section>
    </CommonWrapper>
  );
}
