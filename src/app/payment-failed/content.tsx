"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const [tranId, setTranId] = useState<string>("");

  useEffect(() => {
    const id = searchParams.get("tran_id");
    if (id) setTranId(id);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Failed Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6">
          {/* Failed Icon */}
          <div className="flex justify-center">
            <div className="bg-linear-to-br from-red-400 to-red-500 rounded-full p-4">
              <XCircle size={64} className="text-white" />
            </div>
          </div>

          {/* Failed Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Payment Failed
            </h1>
            <p className="text-gray-500">
              Unfortunately, your payment could not be processed
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 rounded-2xl p-6 space-y-4 text-left border border-red-200">
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

            <div className="text-sm text-red-700 bg-red-100 p-3 rounded-lg">
              <p className="font-semibold mb-1">Possible reasons:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Insufficient funds in your account</li>
                <li>Incorrect card/bank details</li>
                <li>Transaction timeout</li>
                <li>Your bank declined the transaction</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Link
              href="/mycart"
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 block text-center"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition block text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Support Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Contact us for assistance:{" "}
              <Link
                href="/about"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
