"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const status = searchParams.get("status");
    const tranId = searchParams.get("tran_id");
    const amount = searchParams.get("amount");

    if (status === "success") {
      setOrderData({
        tranId: tranId || "N/A",
        amount: amount || "0",
        status: "success",
        timestamp: new Date().toLocaleDateString("en-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen my-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="bg-linear-to-br from-green-400 to-emerald-500 rounded-full p-4">
              <CheckCircle size={64} className="text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Payment Successful!
            </h1>
            <p className="text-gray-500">
              Your order has been placed successfully
            </p>
          </div>

          {/* Order Details */}
          {orderData && (
            <div className="bg-blue-50 rounded-2xl p-6 space-y-4 text-left border border-blue-200">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Transaction ID
                </label>
                <p className="text-lg text-gray-900 font-mono break-all">
                  {orderData.tranId}
                </p>
              </div>

              {orderData.amount && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Amount Paid
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    ৳{parseFloat(orderData.amount).toLocaleString()}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Date & Time
                </label>
                <p className="text-gray-700">{orderData.timestamp}</p>
              </div>
            </div>
          )}

          {/* Info Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              ✓ A confirmation email has been sent to your registered email
              address with order details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Link
              href="/myorders"
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 block text-center"
            >
              View My Orders
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition block text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link
                href="/faq"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Visit FAQ
              </Link>{" "}
              or{" "}
              <Link
                href="/about"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Contact Us
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm mb-3">Secured by</p>
          <div className="flex justify-center items-center gap-4">
            <div className="text-xs bg-white px-3 py-2 rounded-lg shadow">
              🔒 SSL Encrypted
            </div>
            <div className="text-xs bg-white px-3 py-2 rounded-lg shadow">
              ✓ PCI Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
