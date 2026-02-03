"use client";

import SafeImage from "@/components/ui/SafeImage";
import { Eye, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import ReviewModal from "@/components/ui/ReviewModal";
import { apiClient } from "@/api/apiClient";
import { toast } from "react-toastify";

type OrderItem = {
  orderRef: string;
  id: number;
  name: string;
  date: string;
  qty: number;
  price: number;
  status: string;
  statusClass: string;
  productId?: number | null;
  img?: string;
};

export default function MyOrdersPage() {
  const [openReview, setOpenReview] = useState(false);
  const [myOrders, setMyOrders] = useState<OrderItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiClient.request<any[]>("/user-order", {
          auth: true,
          method: "GET",
        });

        // Transform API response to match expected format
        const transformedOrders = (res.data || []).map((order: any) => {
        // Determine status based on pay_status and status
        let statusText = "Processing";
        let statusClass = "bg-yellow-100 text-yellow-700";

        if (order.pay_status === 1) {
          statusText = "Paid";
          statusClass = "bg-green-100 text-green-700";
        } else if (order.pay_status === 0 && order.status === 1) {
          statusText = "Pending Payment";
          statusClass = "bg-orange-100 text-orange-700";
        } else if (order.status === 0) {
          statusText = "Cancelled";
          statusClass = "bg-red-100 text-red-700";
        }

        // Format date
        const orderDate = new Date(order.created_at).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          },
        );

        return {
          id: order.id,
          name: order.product?.name,
          date: orderDate,
          qty: order.product_count || 1,
          price: Number(order.total_amount) || 0,
          status: statusText,
          statusClass: statusClass,
          productId: order.product?.id || null,
          img: order.product?.main_image,
          orderRef: order.order_ref,
        };
      });

        setMyOrders(transformedOrders);
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);
        toast.error(error?.message || "Failed to load orders");
        setMyOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <CommonWrapper>
      <section className="py-10">
        <div className="bg-white border border-blue-200 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

          {myOrders.length === 0 ? (
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
            <>
              {/* MOBILE VIEW */}
              <div className="md:hidden space-y-4">
                {myOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-xl p-4 space-y-4"
                  >
                    {/* Product Section */}
                    <div className="flex gap-3">
                      <div className="rounded-lg border border-gray-200 overflow-hidden shrink-0">
                        <SafeImage
                          src={order?.img}
                          alt={order.name}
                          width={70}
                          height={70}
                          className="object-cover w-17.5 h-17.5"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 line-clamp-2">
                          {order.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.date}
                        </p>
                      </div>
                    </div>

                    {/* Qty and Price */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-medium text-gray-700">{order.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Price</p>
                        <p
                          className="font-semibold"
                          style={{ color: "#2CACE2" }}
                        >
                          ৳{(order.price || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusClass}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <button
                        onClick={() => {
                          setSelectedProductId(order.productId || null);
                          setOpenReview(true);
                        }}
                        className="flex-1 text-xs font-medium cursor-pointer text-[#2CACE2] border border-[#2CACE2] py-2 rounded-lg hover:bg-blue-50 transition"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setOpenOrderDetails(true);
                        }}
                        aria-label="View invoice"
                        className="text-[#2CACE2] p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        aria-label="Download invoice"
                        className="text-[#2CACE2] p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW */}
              <div className="hidden md:block w-full overflow-x-auto">
                <table className="w-full border-collapse">
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
                    {myOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b transition-colors"
                        style={{ borderColor: "#E6E6E6" }}
                      >
                        {/* Product */}
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className="rounded-xl border border-gray-200 overflow-hidden relative shrink-0">
                              <SafeImage
                                src={order?.img}
                                alt={order.name}
                                width={80}
                                height={80}
                                className="object-cover max-w-15 aspect-square"
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
                          ৳{(order.price || 0).toLocaleString()}
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
                            onClick={() => {
                              setSelectedProductId(order.productId || null);
                              setOpenReview(true);
                            }}
                            className="text-sm font-medium cursor-pointer text-[#2CACE2] border border-[#2CACE2] px-4 py-1.5 rounded-lg hover:bg-blue-50 transition"
                          >
                            Review
                          </button>
                        </td>

                        {/* Invoice */}
                        <td className="py-6">
                          <div className="flex justify-end gap-3 text-[#2CACE2]">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setOpenOrderDetails(true);
                              }}
                              aria-label="View invoice"
                            >
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
            </>
          )}

          <ReviewModal
            isOpen={openReview}
            onClose={() => setOpenReview(false)}
            productId={selectedProductId || undefined}
          />

          {/* Order Details Modal */}
          {openOrderDetails && selectedOrder && (
            <div className="fixed inset-0 bg-black/10 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Order Details</h2>
                  <button
                    onClick={() => setOpenOrderDetails(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Order Reference */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Order Reference</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {selectedOrder.orderRef || "N/A"}
                    </p>
                  </div>

                  {/* Product Information */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                    <div className="flex gap-4">
                      <div className="rounded-lg border border-gray-200 overflow-hidden shrink-0">
                        <SafeImage
                          src={selectedOrder?.img}
                          alt={selectedOrder.name}
                          width={120}
                          height={120}
                          className="object-cover w-30 h-30"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-semibold text-gray-700">
                          {selectedOrder.name}
                        </p>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Product ID:</span>{" "}
                            {selectedOrder.productId}
                          </p>
                          <p>
                            <span className="font-medium">Quantity:</span>{" "}
                            {selectedOrder.qty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-[#2CACE2] rounded-full"></div>
                        <div>
                          <p className="text-sm text-gray-500">Order Placed</p>
                          <p className="font-medium text-gray-700">
                            {selectedOrder.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">৳{(selectedOrder.price || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="font-semibold text-gray-700">Total Amount</span>
                        <span className="font-semibold text-[#2CACE2] text-lg">
                          ৳{(selectedOrder.price || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pb-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${selectedOrder.statusClass}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t pt-6 flex gap-3">
                    <button
                      onClick={() => setOpenOrderDetails(false)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      Close
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-[#2CACE2] text-white font-medium rounded-lg hover:bg-[#1b9bd1] transition flex items-center justify-center gap-2">
                      <Download size={18} />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </CommonWrapper>
  );
}
