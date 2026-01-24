import { X } from "lucide-react";
import { toast } from "react-toastify";
import SafeImage from "@/components/ui/SafeImage";

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredProducts: any[];
  allLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showAll: boolean;
  onToggleShowAll: () => void;
  onSelectProduct: (product: any) => void;
  modalSlot: number;
  product1: any;
  product2: any;
}

export default function ProductSelectionModal({
  isOpen,
  onClose,
  filteredProducts,
  allLoading,
  searchQuery,
  onSearchChange,
  showAll,
  onToggleShowAll,
  onSelectProduct,
  modalSlot,
  product1,
  product2,
}: ProductSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200 bg-linear-to-r from-blue-100/50 to-blue-50">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Select a Product
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredProducts.length} products available
              {!showAll ? " — showing similar category" : " — showing all products"}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3 flex-wrap justify-end">
            <div className="hidden sm:flex items-center gap-2">
              <input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              onClick={() => {
                onSearchChange("");
                onToggleShowAll();
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showAll
                  ? "bg-linear-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {showAll ? "All" : "Category"}
            </button>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body: scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Mobile search */}
          <div className="sm:hidden mb-4">
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {allLoading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No products found</p>
                    <button
                      onClick={() => {
                        onSearchChange("");
                        if (!showAll) onToggleShowAll();
                      }}
                      className="mt-4 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
                    >
                      View All Products
                    </button>
                  </div>
                )}

                {filteredProducts.map((p) => {
                  const otherProduct = modalSlot === 1 ? product2 : product1;
                  const isDisabled = otherProduct && otherProduct.id === p.id;
                  const alreadySelected =
                    (modalSlot === 1 && product1 && product1.id === p.id) ||
                    (modalSlot === 2 && product2 && product2.id === p.id);

                  return (
                    <div
                      key={p.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg hover:border-primary/50 transition-all"
                    >
                      <div className="bg-gray-50 p-4 relative">
                        <SafeImage
                          src={p.main_image}
                          fallbackSrc="/images/monitor.jpg"
                          alt={p.name}
                          width={300}
                          height={192}
                          className="w-full h-48 object-contain"
                        />
                        {p.stock > 0 && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            In Stock
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-3">
                        <h4 className="font-semibold text-gray-900 line-clamp-2">
                          {p.name}
                        </h4>

                        <div className="text-primary font-bold text-lg">
                          ৳{(p.sale_price ?? p.regular_price ?? 0).toLocaleString()}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              onSelectProduct(p);
                            }}
                            disabled={isDisabled}
                            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all ${
                              isDisabled
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                  : "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                            }`}
                          >
                            {alreadySelected ? "Selected" : "Add"}
                          </button>
                          <a
                            href={`/products/${p.slug}`}
                            target="_blank"
                              className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600 text-center">
          Press ESC or click outside to close • Use search to find products quickly
        </div>
      </div>
    </div>
  );
}
