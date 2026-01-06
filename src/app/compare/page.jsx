"use client";

import React, { useState } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { Download, Plus } from "lucide-react";
import Image from "next/image";

// Reusable Product Card Component
const ProductCard = ({ title, product, onAdd }) => {
  const specs = [
    { label: "Height", value: "38.6mm" },
    { label: "Material", value: "Stainless Stee" },
    { label: "Case", value: "40g" },
    {
      label: "Color",
      value: "blue, gray, green, light blue, lime, purple, red, yellow",
    },
    { label: "Depth", value: "10.5mm" },
    { label: "Width", value: "38.6mm" },
    { label: "Size", value: "Large, Medium, Small" },
  ];

  return (
    <div className="border border-primary/20 bg-white shadow-sm rounded-2xl p-6 h-full transition-all">
      {/* Header */}
      <h2 className="mb-6 text-xl text-primary py-3 border-b border-primary/20 font-bold">
        {title}
      </h2>

      {!product ? (
        /* Empty State: Plus Icon Placeholder */
        <div
          onClick={onAdd}
          className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 group transition-all"
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
              src="https://cdn.shopify.com/s/files/1/0630/5362/7541/files/94C17AA_1_ea18903a-85f6-46cb-bd5d-ed8c922aaaf3.jpg?v=1756737831"
              alt="Product"
              height={500}
              width={500}
              className="aspect-video object-contain p-4 w-full"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              A donut dressed up as a Smart Assistant
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center border-b border-primary/20 pb-2 mb-4">
              <span className="text-lg font-bold text-gray-700">
                Specification
              </span>
              <span className="text-lg font-bold text-primary">৳36000</span>
            </div>

            <div className="divide-y divide-gray-100">
              {specs.map((spec, index) => (
                <div key={index} className="grid grid-cols-3 py-4 text-sm">
                  <span className="text-gray-500 font-medium">
                    {spec.label}
                  </span>
                  <span className="col-span-2 text-gray-700">{spec.value}</span>
                </div>
              ))}
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

  // Function to simulate adding a product (You can replace this with a Modal trigger)
  const handleAddProduct = (slot) => {
    if (slot === 1) setProduct1({ id: 1, name: "Sample Mouse" });
    else setProduct2({ id: 2, name: "Sample Mouse" });
  };

  return (
    <CommonWrapper>
      <div className="py-10 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Actions */}
          <div className="flex items-center justify-end py-4">
            <button className="px-5 py-2.5 font-semibold bg-white text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2 shadow-sm">
              <Download size={20} /> Download
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
            <ProductCard
              title="Choose Product"
              product={product1}
              onAdd={() => handleAddProduct(1)}
            />
            <ProductCard
              title="Compare Product"
              product={product2}
              onAdd={() => handleAddProduct(2)}
            />
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default CompareProduct;
