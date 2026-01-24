"use client";

import { useState } from "react";
import {
  useGetCategories,
  useGetSubCategories,
  useGetBrands,
} from "@/api/hooks";
import { ArrowDown, ArrowUp, X } from "lucide-react";

interface Props {
  onCategoryChange: (selectedCategories: string[]) => void;
  onSubCategoryChange?: (selectedSubCategories: string[]) => void;
  onBrandChange?: (selectedBrands: string[]) => void;
  onPriceChange: (priceRange: [number, number]) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// fetched categories/brands via hooks

export default function FilterSidebar({
  onCategoryChange,
  onSubCategoryChange,
  onBrandChange,
  onPriceChange,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const [openPrice, setOpenPrice] = useState(true);
  const [openCategory, setOpenCategory] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: categoriesResponse } = useGetCategories();
  const categories = categoriesResponse?.data || [];

  const { data: subCategoriesResponse } = useGetSubCategories();
  const subCategories = subCategoriesResponse?.data || [];

  const { data: brandsResponse } = useGetBrands();
  const brands = brandsResponse?.data || [];

  // Price States
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(300000);
  const MIN_PRICE = 100;
  const MAX_PRICE = 300000;
  const MIN_GAP = 1000;

  // Compute range bar percentages (guarded 0-100)
  const leftPct = Math.max(0, Math.min(100, (minPrice / MAX_PRICE) * 100));
  const rightPct = Math.max(
    0,
    Math.min(100, 100 - (maxPrice / MAX_PRICE) * 100),
  );
  const rangeStyle = { left: `${leftPct}%`, right: `${rightPct}%` };

  const toggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];

    setSelectedCategories(updated);
    onCategoryChange(updated);
  };

  const handlePriceChange = () => {
    onPriceChange([minPrice, maxPrice]);
  };

  const toggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updated);
    if (onBrandChange) {
      onBrandChange(updated);
    }
  };

  const toggleSubCategory = (sub: string) => {
    const updated = selectedSubCategories.includes(sub)
      ? selectedSubCategories.filter((s) => s !== sub)
      : [...selectedSubCategories, sub];

    setSelectedSubCategories(updated);
    if (onSubCategoryChange) {
      onSubCategoryChange(updated);
    }
  };

  return (
    <aside
      className={`
        fixed md:sticky top-16 left-0
        w-[88vw] sm:w-[320px] md:w-64 p-4 space-y-6
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        transition-transform duration-300 ease-in-out
        z-30
        max-h-[85vh] md:max-h-none overflow-y-auto
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
            <div className="relative h-0.5 w-full bg-gray-200 rounded-lg">
              {/* This div creates the colored bar between handles */}
              <div
                className="absolute h-full bg-[#2CACE2] rounded-lg"
                style={rangeStyle}
              />
              <input
                type="range"
                min={100}
                max={300000}
                value={minPrice}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (isNaN(val)) val = MIN_PRICE;
                  val = Math.max(MIN_PRICE, Math.min(val, maxPrice - MIN_GAP));
                  setMinPrice(val);
                  onPriceChange([val, maxPrice]);
                }}
                className="absolute w-full -top-0.5 h-1 bg-transparent appearance-none pointer-events-none cursor-pointer accent-[#2CACE2] [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min={100}
                max={300000}
                value={maxPrice}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (isNaN(val)) val = MAX_PRICE;
                  val = Math.min(MAX_PRICE, Math.max(val, minPrice + MIN_GAP));
                  setMaxPrice(val);
                  onPriceChange([minPrice, val]);
                }}
                className="absolute w-full -top-0.5 h-1 bg-transparent appearance-none pointer-events-none cursor-pointer accent-[#2CACE2] [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">Min Price</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (isNaN(val)) val = MIN_PRICE;
                    // Clamp and ensure gap
                    val = Math.max(
                      MIN_PRICE,
                      Math.min(val, maxPrice - MIN_GAP),
                    );
                    setMinPrice(val);
                    onPriceChange([val, maxPrice]);
                  }}
                  className="w-full border border-[#bee5f6] rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#2CACE2]"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">Max Price</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (isNaN(val)) val = MAX_PRICE;
                    // Clamp and ensure gap
                    val = Math.min(
                      MAX_PRICE,
                      Math.max(val, minPrice + MIN_GAP),
                    );
                    setMaxPrice(val);
                    onPriceChange([minPrice, val]);
                  }}
                  className="w-full border border-[#bee5f6] rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#2CACE2]"
                />
              </div>
            </div>

            <button
              onClick={() => {
                onCategoryChange(selectedCategories);
                if (typeof onSubCategoryChange === "function")
                  onSubCategoryChange(selectedSubCategories);
                if (typeof onBrandChange === "function")
                  onBrandChange(selectedBrands);
                onPriceChange([minPrice, maxPrice]);
              }}
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
          <div className="mt-3 space-y-2 max-h-60 overflow-auto pr-2 custom-scrollbar">
            {categories.map((cat: any) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(String(cat.id))}
                  onChange={() => toggleCategory(String(cat.id))}
                  className="w-4 h-4 rounded border-gray-300 text-[#2CACE2] focus:ring-[#2CACE2] accent-[#2CACE2]"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#2CACE2] transition wrap-break-word">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sub-Categories */}
      <div className="bg-white border border-[#bee5f6] p-4 rounded-2xl hover:-translate-y-1 hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] transition duration-300">
        <h3 className="font-semibold text-lg text-[#303030] mb-2">
          Sub-Categories
        </h3>
        <div className="space-y-2 max-h-48 overflow-auto pr-2">
          {subCategories.map((s: any) => (
            <label
              key={s.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedSubCategories.includes(String(s.id))}
                onChange={() => toggleSubCategory(String(s.id))}
                className="w-4 h-4 rounded border-gray-300 text-[#2CACE2] focus:ring-[#2CACE2] accent-[#2CACE2]"
              />
              <span className="text-sm text-gray-600 group-hover:text-[#2CACE2] transition wrap-break-word">
                {s.name}
              </span>
            </label>
          ))}
        </div>
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
          <div className="mt-3 space-y-2 max-h-48 overflow-auto pr-2">
            {brands.map((brand: any) => (
              <label
                key={brand.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(String(brand.id))}
                  onChange={() => toggleBrand(String(brand.id))}
                  className="w-4 h-4 rounded border-gray-300 text-[#2CACE2] focus:ring-[#2CACE2] accent-[#2CACE2]"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#2CACE2] transition wrap-break-word">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
