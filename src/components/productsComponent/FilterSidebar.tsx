"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, X } from "lucide-react";

interface Props {
  onCategoryChange: (selectedCategories: string[]) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const CATEGORIES = [
  "Keyboard",
  "Mouse",
  "Laptop",
  "Casing",
  "Monitor",
  "Speaker",
  "SSD",
  "HDD",
  "RAM",
];

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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Price States
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(120000);

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
    <aside
      className={`
        fixed md:sticky top-16 left-0
        w-64 bg-white rounded-xl p-4 space-y-6
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        transition-transform duration-300 ease-in-out
        z-30
        h-full overflow-y-auto md:h-auto md:overflow-visible
      `}
    >
      {/* Close button (mobile only) */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Price Range Section */}
      <div className="bg-white border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-1 hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition duration-300">
        <button
          onClick={() => setOpenPrice(!openPrice)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-lg text-[#303030]">Price Range</h3>
          <span className="text-[#2CACE2]">
            {openPrice ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </span>
        </button>

        {openPrice && (
          <div className="mt-5 space-y-5">
            {/* Dual Range Slider Container */}
            <div className="relative h-2 w-full bg-gray-200 rounded-lg">
              {/* This div creates the colored bar between handles */}
              <div
                className="absolute h-full bg-[#2CACE2] rounded-lg"
                style={{
                  left: `${(minPrice / 120000) * 100}%`,
                  right: `${100 - (maxPrice / 120000) * 100}%`,
                }}
              />
              <input
                type="range"
                min={100}
                max={120000}
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
                }
                className="absolute w-full -top-1 h-2 bg-transparent appearance-none pointer-events-none cursor-pointer accent-[#2CACE2] [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min={100}
                max={120000}
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
                }
                className="absolute w-full -top-1 h-2 bg-transparent appearance-none pointer-events-none cursor-pointer accent-[#2CACE2] [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
              />
            </div>

            {/* Price Inputs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">
                  Min Price
                </span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full border border-[#bee5f6] rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#2CACE2]"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">
                  Max Price
                </span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full border border-[#bee5f6] rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#2CACE2]"
                />
              </div>
            </div>

            <button
              onClick={() => onCategoryChange(selectedCategories)}
              className="w-full py-2.5 rounded-xl bg-[#2CACE2] text-white text-sm font-semibold hover:bg-[#1b9bd1] shadow-sm transition active:scale-95"
            >
              Apply Filter
            </button>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-1 hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition duration-300">
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-lg text-[#303030]">
            Product Category
          </h3>
          <span className="text-[#2CACE2]">
            {openCategory ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </span>
        </button>

        {openCategory && (
          <div className="mt-3 space-y-2 max-h-60 pr-2 custom-scrollbar">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-gray-300 text-[#2CACE2] focus:ring-[#2CACE2] accent-[#2CACE2]"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#2CACE2] transition">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="bg-white border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-1 hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition duration-300">
        <button
          onClick={() => setOpenBrands(!openBrands)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-lg text-[#303030]">Brands</h3>
          <span className="text-[#2CACE2]">
            {openBrands ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </span>
        </button>

        {openBrands && (
          <div className="mt-3 space-y-2">
            {BRANDS.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-[#2CACE2] focus:ring-[#2CACE2] accent-[#2CACE2]"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#2CACE2] transition">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
