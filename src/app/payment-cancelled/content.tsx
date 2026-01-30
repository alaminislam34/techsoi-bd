"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelledContent() {
  const searchParams = useSearchParams();
  const [tranId, setTranId] = useState<string>("");

  useEffect(() => {
    const id = searchParams.get("tran_id");
    if (id) setTranId(id);
  }, [searchParams]);

  return (
    <div className="min-h-screen my-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Cancelled Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6">
          {/* Cancelled Icon */}
          <div className="flex justify-center">
            <div className="bg-linear-to-br from-amber-400 to-yellow-500 rounded-full p-4">
              <AlertCircle size={64} className="text-white" />
            </div>
          </div>

          {/* Cancelled Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Payment Cancelled
            </h1>
            <p className="text-gray-500">
              Your payment has been cancelled. Your cart is still saved.
            </p>
          </div>

          {/* Details */}
          <div className="bg-amber-50 rounded-2xl p-6 space-y-4 text-left border border-amber-200">
            {tranId && (
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Transaction ID
                </label>
                <p className="text-sm text-gray-700 font-mono break-all">
                  {tranId}
                </p>
              </div>
            )}

            <div className="text-sm text-amber-700 bg-amber-100 p-3 rounded-lg">
              <p>
                You can return to your cart and try again whenever you're ready.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Link
              href="/mycart"
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 block text-center"
            >
              Return to Cart
            </Link>

            <Link
              href="/products"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition block text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Questions?{" "}
              <Link
                href="/faq"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Visit FAQ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
