import { X, Check, Plus, ShoppingCart } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";

interface CompareProductCardProps {
  title: string;
  product: any;
  onAdd: () => void;
  onRemove: () => void;
  slot: number;
}

export default function CompareProductCard({
  title,
  product,
  onAdd,
  onRemove,
  slot,
}: CompareProductCardProps) {
  return (
    <div className="sticky top-4 border border-gray-200 bg-white shadow-lg rounded-3xl overflow-hidden h-fit transition-all hover:shadow-xl">
      {/* Header with linear background */}
      <div className="bg-linear-to-r from-blue-100/50 to-blue-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            {slot === 1 ? "📱" : "📱"} {title}
          </h2>
          {product && (
            <button
              onClick={onRemove}
              className="p-1.5 hover:bg-red-50 rounded-lg transition text-gray-400 hover:text-red-500"
              title="Remove product"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {!product ? (
        /* Empty State: Plus Icon Placeholder */
        <div
          onClick={onAdd}
          className="flex flex-col items-center justify-center py-16 px-6 cursor-pointer group transition-all hover:bg-gray-50"
        >
          <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-100 transition-all">
            <Plus
              size={40}
              className="text-primary group-hover:scale-110 transition-transform"
            />
          </div>
          <p className="mt-4 text-gray-600 font-semibold group-hover:text-primary transition">
            Select a Product
          </p>
          <p className="text-xs text-gray-400 mt-2">to compare side by side</p>
        </div>
      ) : (
        /* Product Selected State */
        <div className="animate-in fade-in duration-300 p-6 space-y-6">
          {/* Image Section */}
          <div className="relative w-full bg-linear-to-br from-gray-50 to-white rounded-2xl overflow-hidden border border-gray-100">
            <SafeImage
              src={product?.main_image}
              fallbackSrc="/images/monitor.jpg"
              alt={product.name}
              height={280}
              width={280}
              className="aspect-video object-contain p-4 w-full"
            />
            {(product.stock ?? 0) > 0 && (
              <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Check size={14} /> In Stock
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.short_description}
              </p>
            </div>

            {/* Price Section */}
            <div className="bg-linear-to-r from-blue-50 to-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs text-gray-600 font-medium uppercase tracking-wider mb-1">
                Price
              </p>
              <p className="text-2xl font-bold text-primary">
                ৳
                {(
                  product.sale_price ??
                  product.regular_price ??
                  0
                ).toLocaleString()}
              </p>
              {product.sale_price &&
                product.regular_price > product.sale_price && (
                  <p className="text-xs text-gray-500 line-through mt-1">
                    ৳{product.regular_price.toLocaleString()}
                  </p>
                )}
            </div>

            {/* Stock Status */}
            {(product.stock ?? 0) <= 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm font-semibold text-red-600">
                  Out of Stock
                </p>
              </div>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 bg-amber-50 rounded-xl p-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating}/5
                </span>
              </div>
            )}

            {/* Action Button */}
            <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
