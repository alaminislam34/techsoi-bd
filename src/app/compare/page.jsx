"use client";

import React, { useState, useMemo, useEffect } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { Download, Plus, X } from "lucide-react";
import Image from "next/image";
import { useGetAllProducts } from "@/api/hooks/useProducts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

// Reusable Product Card Component
const ProductCard = ({ title, product, onAdd, onRemove }) => {
  const specs = product?.details?.specifications || [];

  return (
    <div className="border border-primary/20 bg-white shadow-sm rounded-2xl p-6 h-full transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-primary py-1 font-bold">{title}</h2>
        {product && (
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      {!product ? (
        /* Empty State: Plus Icon Placeholder */
        <div
          onClick={onAdd}
          className="flex flex-col items-center justify-center min-h-100 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 group transition-all"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            <Plus size={32} className="text-gray-400 group-hover:text-white" />
          </div>
          <p className="mt-4 text-gray-500 font-medium group-hover:text-primary">
            Add Product to Compare
          </p>
        </div>
      ) : (
        /* Product Selected State */
        <div className="animate-in fade-in duration-500">
          <div className="relative w-full mb-6 shadow-md rounded-xl overflow-hidden">
            <Image
              src={product.main_image || "/images/monitor.jpg"}
              alt={product.name}
              height={260}
              width={260}
              className="aspect-video object-contain p-4 w-full"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.short_description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-primary">
                ৳
                {(
                  product.sale_price ??
                  product.regular_price ??
                  0
                ).toLocaleString()}
              </span>
              <span
                className={`px-2 py-1 rounded text-sm ${(product.stock ?? 0) > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CompareProduct = () => {
  // State to track if products are selected for Slot 1 and Slot 2
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlot, setModalSlot] = useState(1);

  // Search/filter UI for modal
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Fetch all products for selection
  const { data: allProductsResp, isLoading: allLoading } = useGetAllProducts();
  const allProducts = allProductsResp?.data || [];

  const openAddModal = (slot) => {
    setModalSlot(slot);
    setIsModalOpen(true);
    setSearchQuery("");
    setShowAll(false);
  };

  const addProductToSlot = (product, slot) => {
    if (slot === 1) setProduct1(product);
    else setProduct2(product);
    setIsModalOpen(false);
  };

  const removeFromSlot = (slot) => {
    if (slot === 1) setProduct1(null);
    else setProduct2(null);
  };

  // When modal opens: lock body scroll and handle Escape key to close
  useEffect(() => {
    if (!isModalOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const handleDownload = () => {
    if (!product1 && !product2) {
      toast.error("Please select at least one product to compare");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Product Comparison Report", 14, 20);

    const cleanText = (html) => {
      if (!html) return "";
      // Removes HTML, handles &nbsp;, and collapses multiple spaces/newlines
      return html
        .replace(/<[^>]*>?/gm, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const safeParseSpecs = (p) => {
      // Check various common paths for specifications
      let specs =
        p?.details?.specifications || p?.specifications || p?.attributes;

      if (typeof specs === "string") {
        try {
          specs = JSON.parse(specs);
        } catch (e) {
          specs = [];
        }
      }

      if (!Array.isArray(specs) || specs.length === 0)
        return "Details not available";

      return specs
        .map((s) => `${s.name || s.label}: ${s.value || s.text}`)
        .join("\n");
    };

    const p1Name = product1?.name ?? "Product 1";
    const p2Name = product2?.name ?? "Product 2";

    const head = [["Feature", p1Name, p2Name]];

    const body = [
      [
        "Price",
        `BDT ${(product1?.sale_price ?? product1?.regular_price ?? 0).toLocaleString()}`,
        `BDT ${(product2?.sale_price ?? product2?.regular_price ?? 0).toLocaleString()}`,
      ],
      [
        "Availability",
        product1?.stock > 0 ? "In Stock" : "Out of Stock",
        product2?.stock > 0 ? "In Stock" : "Out of Stock",
      ],
      [
        "Rating",
        product1?.rating ? `${product1.rating} / 5` : "—",
        product2?.rating ? `${product2.rating} / 5` : "—",
      ],
      [
        "Description",
        cleanText(product1?.short_description || product1?.description),
        cleanText(product2?.short_description || product2?.description),
      ],
      ["Specifications", safeParseSpecs(product1), safeParseSpecs(product2)],
    ];

    autoTable(doc, {
      head,
      body,
      startY: 30,
      theme: "grid",
      margin: { horizontal: 14 },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        overflow: "linebreak",
        valign: "top",
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [44, 172, 226],
        textColor: 255,
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 32, fontStyle: "bold", fillColor: [250, 250, 250] },
        1: { cellWidth: 77 }, // Balanced widths for A4
        2: { cellWidth: 77 },
      },
      // Fixes the "text spacing" by controlling line height
      bodyStyles: {
        lineHeight: 1.5,
      },
      didDrawPage: (data) => {
        const dateStr = new Date().toLocaleString();
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Generated on: ${dateStr}`,
          14,
          doc.internal.pageSize.getHeight() - 10,
        );
      },
    });

    doc.save(`product-comparison-${Date.now()}.pdf`);
  };

  // Compute filtered list for the modal: show same-category items when possible
  const filteredProducts = useMemo(() => {
    let list = Array.isArray(allProducts) ? allProducts.slice() : [];

    // By default, filter to same category if adding the other slot
    if (!showAll) {
      if (modalSlot === 1 && product2) {
        list = list.filter(
          (p) => p.category_id === product2.category_id && p.id !== product2.id,
        );
      } else if (modalSlot === 2 && product1) {
        list = list.filter(
          (p) => p.category_id === product1.category_id && p.id !== product1.id,
        );
      }
    }

    // Apply search filter
    if (searchQuery && searchQuery.trim().length) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
    }

    return list;
  }, [allProducts, modalSlot, product1, product2, searchQuery, showAll]);

  return (
    <CommonWrapper>
      <div className="py-10 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Actions */}
          <div className="flex items-center justify-end py-4">
            <button
              onClick={() => handleDownload()}
              disabled={!product1 && !product2}
              className={`px-5 py-2.5 font-semibold border rounded-xl transition-all flex items-center gap-2 shadow-sm ${!product1 && !product2 ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-primary border border-primary/30 hover:bg-primary hover:text-white"}`}
            >
              <Download size={20} /> Download
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
            <ProductCard
              title="Choose Product"
              product={product1}
              onAdd={() => openAddModal(1)}
              onRemove={() => removeFromSlot(1)}
            />
            <ProductCard
              title="Compare Product"
              product={product2}
              onAdd={() => openAddModal(2)}
              onRemove={() => removeFromSlot(2)}
            />
          </div>

          {/* Product Selection Modal */}
          {isModalOpen && (
            <div
              role="dialog"
              aria-modal="true"
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 p-6 border-b">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Select a product to add
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {filteredProducts.length} products available
                      {!showAll ? " — showing similar category by default" : ""}
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-xs text-gray-400">Search</span>
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products by name..."
                        className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setShowAll(!showAll);
                      }}
                      className={`px-4 py-2 rounded-lg border ${showAll ? "bg-primary text-white" : "bg-white"}`}
                    >
                      {showAll ? "Filtered" : "Show All"}
                    </button>

                    <button
                      onClick={() => setIsModalOpen(false)}
                      aria-label="Close dialog"
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <X />
                    </button>
                  </div>
                </div>

                {/* Body: scrollable */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {allLoading ? (
                    <div className="py-20 text-center">Loading products...</div>
                  ) : (
                    <div>
                      {/* Mobile search */}
                      <div className="sm:hidden mb-4">
                        <input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products by name..."
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredProducts.length === 0 && (
                          <div className="col-span-full text-center py-12 text-gray-500">
                            No products found.
                          </div>
                        )}

                        {filteredProducts.map((p) => {
                          const otherProduct =
                            modalSlot === 1 ? product2 : product1;
                          const isDisabled =
                            otherProduct && otherProduct.id === p.id;
                          const alreadySelected =
                            (modalSlot === 1 &&
                              product1 &&
                              product1.id === p.id) ||
                            (modalSlot === 2 &&
                              product2 &&
                              product2.id === p.id);

                          return (
                            <div
                              key={p.id}
                              className="border rounded-lg p-4 bg-white flex flex-col hover:shadow-lg transition"
                            >
                              <div className="flex items-center gap-4">
                                <img
                                  src={p.main_image || "/images/monitor.jpg"}
                                  alt={p.name}
                                  className="w-20 h-20 object-contain"
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-sm line-clamp-2">
                                    {p.name}
                                  </div>
                                  <div className="text-sm text-primary mt-1">
                                    ৳
                                    {(
                                      p.sale_price ??
                                      p.regular_price ??
                                      0
                                    ).toLocaleString()}
                                  </div>
                                  <div className="text-xs mt-1">
                                    {(p.stock ?? 0) > 0
                                      ? "In Stock"
                                      : "Out of Stock"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    addProductToSlot(p, modalSlot);
                                    toast.success("Added to compare");
                                  }}
                                  disabled={isDisabled}
                                  className={`flex-1 px-4 py-2 rounded text-white ${isDisabled ? "bg-gray-300 cursor-not-allowed text-gray-600" : "bg-primary hover:bg-blue-700"}`}
                                >
                                  {alreadySelected
                                    ? "Selected"
                                    : isDisabled
                                      ? "Selected"
                                      : "Add to compare"}
                                </button>
                                <a
                                  href={`/products/${p.slug}`}
                                  className="px-4 py-2 border rounded text-center"
                                >
                                  View
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer (optional usage hint) */}
                <div className="p-4 border-t text-sm text-gray-500">
                  Tip: Use the search or toggle Show All to find other products.
                  Click outside or ESC to close.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CommonWrapper>
  );
};

export default CompareProduct;
