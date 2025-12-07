"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import FilterSidebar from "@/components/productsComponent/FilterSidebar";
import { HeartIcon, ShoppingBag, Menu } from "lucide-react";
import { productList, ProductType } from "@/components/lib/dummyProd";
import Link from "next/link";

export default function ProductPage() {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(productList);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter products by selected categories
  const handleCategoryFilter = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(productList);
      return;
    }
    const filtered = productList.filter((product) =>
      selectedCategories.includes(product.category)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="w-full px-4 py-10 relative">
      {/* Small screen menu button */}
      <div className="md:hidden fixed top-4 -left-1 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 cursor-pointer rounded-md bg-blue-500 text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <FilterSidebar
          onCategoryChange={handleCategoryFilter}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Product List */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="border border-[#2cace2] rounded-2xl p-4 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105 bg-white"
            >
              {/* Product Image */}
              <div className="w-full h-52 relative rounded-md overflow-hidden">
                <Image
                  src={p.image as StaticImageData} // ensure correct type
                  alt={p.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Product Name */}
              <h3 className="mt-3 font-semibold text-[#303030] text-sm md:text-base">
                {p.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">{p.category}</p>

              {/* Price & Rating */}
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="line-through text-gray-400 text-sm">৳{p.regularPrice}</p>
                  <p className="text-xl font-bold text-[#2cace2]">৳{p.salePrice}</p>
                </div>
                <div className="text-sm text-yellow-500 font-medium">
                  ⭐{p.rating} <span className="text-gray-500">({p.reviewCount})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <Link href={`/products/${p.id}`}>
                  <button className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg bg-[#eaf7fc] hover:bg-[#2CACE2] hover:text-white transition text-[#303030]">
                    <ShoppingBag size={18} />
                    <span className="text-sm font-medium">Buy Now</span>
                  </button>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    aria-label="Add to cart"
                    className="cursor-pointer w-10 h-10 rounded-lg bg-[#eaf7fc] hover:bg-[#2CACE2] flex items-center justify-center transition text-[#303030]"
                  >
                    <ShoppingBag size={18} />
                  </button>

                  <button
                    aria-label="Add to wishlist"
                    className="cursor-pointer w-10 h-10 rounded-lg bg-[#eaf7fc] hover:bg-[#2CACE2] flex items-center justify-center transition text-[#303030]"
                  >
                    <HeartIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
