import { Check } from "lucide-react";

interface ComparisonTableProps {
  product1: any;
  product2: any;
}

export default function ComparisonTable({
  product1,
  product2,
}: ComparisonTableProps) {
  if (!product1 || !product2) return null;

  return (
    <div className="animate-in fade-in duration-500 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-12">
      <div className="bg-linear-to-r from-blue-100/50 to-blue-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Detailed Comparison</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/4">
                Feature
              </th>
              <th className="text-center px-6 py-4 font-semibold text-gray-700">
                {product1.name}
              </th>
              <th className="text-center px-6 py-4 font-semibold text-gray-700">
                {product2.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Price Comparison */}
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-semibold text-gray-900">Price</td>
              <td className="text-center px-6 py-4">
                <span className="text-xl font-bold text-primary">
                  ৳
                  {(
                    product1.sale_price ??
                    product1.regular_price ??
                    0
                  ).toLocaleString()}
                </span>
              </td>
              <td className="text-center px-6 py-4">
                <span className="text-xl font-bold text-primary">
                  ৳
                  {(
                    product2.sale_price ??
                    product2.regular_price ??
                    0
                  ).toLocaleString()}
                </span>
              </td>
            </tr>

            {/* Stock Status */}
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-semibold text-gray-900">
                Stock Status
              </td>
              <td className="text-center px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    product1.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product1.stock > 0 ? (
                    <>
                      <Check size={16} /> In Stock
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </span>
              </td>
              <td className="text-center px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    product2.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product2.stock > 0 ? (
                    <>
                      <Check size={16} /> In Stock
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </span>
              </td>
            </tr>

            {/* Rating */}
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-semibold text-gray-900">Rating</td>
              <td className="text-center px-6 py-4">
                {product1.rating ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {product1.rating}
                    </span>
                    <span className="text-amber-400">★★★★★</span>
                  </div>
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </td>
              <td className="text-center px-6 py-4">
                {product2.rating ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {product2.rating}
                    </span>
                    <span className="text-amber-400">★★★★★</span>
                  </div>
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </td>
            </tr>

            {/* Description */}
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-semibold text-gray-900">
                Description
              </td>
              <td className="text-center px-6 py-4 text-sm text-gray-600">
                {product1.short_description}
              </td>
              <td className="text-center px-6 py-4 text-sm text-gray-600">
                {product2.short_description}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
