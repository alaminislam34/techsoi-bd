"use client";

import React, { useState, useMemo, useEffect } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import CompareProductCard from "@/components/productsComponent/CompareProductCard";
import ProductSelectionModal from "@/components/productsComponent/ProductSelectionModal";
import ComparisonTable from "@/components/productsComponent/ComparisonTable";
import DownloadButton from "@/components/productsComponent/DownloadButton";
import { useGetAllProducts } from "@/api/hooks/useProducts";
import { toast } from "react-toastify";

const CompareProduct = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlot, setModalSlot] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

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
    toast.success("Product added to compare!");
  };

  const removeFromSlot = (slot) => {
    if (slot === 1) setProduct1(null);
    else setProduct2(null);
    toast.info("Product removed");
  };

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

  const filteredProducts = useMemo(() => {
    let list = Array.isArray(allProducts) ? allProducts.slice() : [];

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

    if (searchQuery && searchQuery.trim().length) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
    }

    return list;
  }, [allProducts, modalSlot, product1, product2, searchQuery, showAll]);

  return (
    <CommonWrapper>
      <div className="py-12 bg-linear-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Compare Products
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select and compare up to 2 products side by side to make the
                best purchase decision
              </p>
            </div>

            {/* Download Button */}
            <DownloadButton product1={product1} product2={product2} />
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CompareProductCard
              title="Product 1"
              product={product1}
              onAdd={() => openAddModal(1)}
              onRemove={() => removeFromSlot(1)}
              slot={1}
            />
            <CompareProductCard
              title="Product 2"
              product={product2}
              onAdd={() => openAddModal(2)}
              onRemove={() => removeFromSlot(2)}
              slot={2}
            />
          </div>

          {/* Comparison Table */}
          <ComparisonTable product1={product1} product2={product2} />

          {/* Product Selection Modal */}
          <ProductSelectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            filteredProducts={filteredProducts}
            allLoading={allLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showAll={showAll}
            onToggleShowAll={() => setShowAll(!showAll)}
            onSelectProduct={(product) => addProductToSlot(product, modalSlot)}
            modalSlot={modalSlot}
            product1={product1}
            product2={product2}
          />
        </div>
      </div>
    </CommonWrapper>
  );
};

export default CompareProduct;
