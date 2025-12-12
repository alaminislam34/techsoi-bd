"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  onCategoryChange: (selectedCategories: string[]) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const CATEGORIES = ["Keyboard", "Mouse", "Laptop", "Casing", "Monitor", "Speaker", "SSD", "HDD", "RAM"];
const BRANDS = ["MSI", "Gigabyte", "Razer", "Asus", "Samsung", "Corsair"];

export default function FilterSidebar({
  onCategoryChange,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const [openPrice, setOpenPrice] = useState(true);
  const [openCategory, setOpenCategory] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState(50000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(updated);
    onCategoryChange(updated);
  };

  const toggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
  };

  return (
    <>
      {/* Overlay / Dim background */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 
          w-64 bg-white rounded-xl p-4 space-y-6
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          transition-transform duration-300 ease-in-out z-50

          /* THIS IS THE FIX */
          h-full overflow-y-auto md:h-auto md:overflow-visible
        `}
      >
        {/* Close button (mobile only) */}
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Price Section */}
        <div className="bg-white  border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition">
          <button
            onClick={() => setOpenPrice(!openPrice)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-semibold text-lg">Price Range</h3>
            <span className="text-[#2CACE2]">
              {openPrice ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            </span>
          </button>

          {openPrice && (
            <div className="mt-3">
              <input
                type="range"
                min={100}
                max={120000}
                step={100}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full priceRange"
              />

              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <span>৳100</span>
                <span>৳{price}</span>
                <span>৳120000</span>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="bg-white border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition">
          <button
            onClick={() => setOpenCategory(!openCategory)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-semibold text-lg">Product Category</h3>
            <span className="text-[#2CACE2]">
              {openCategory ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            </span>
          </button>

          {openCategory && (
            <div className="mt-3 space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 accent-[#2CACE2]"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="bg-white border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition">
          <button
            onClick={() => setOpenBrands(!openBrands)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-semibold text-lg">Brands</h3>
            <span className="text-[#2CACE2]">
              {openBrands ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            </span>
          </button>

          {openBrands && (
            <div className="mt-3 space-y-2">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 accent-[#2CACE2]"
                  />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
