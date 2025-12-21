"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import FilterSidebar from "@/components/productsComponent/FilterSidebar";
import Link from "next/link";
import { productList, ProductType } from "@/components/lib/dummyProd";
import { Menu } from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";

export default function ProductPage() {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(productList);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <CommonWrapper>
      <div className="w-full py-10 ">

        {/* Small Screen Sidebar Button */}
        <div className="md:hidden fixed  top-48 left-0 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 cursor-pointer backdrop:blur-2xl rounded-lg bg-[#2cabe291] text-white shadow-md"
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="flex ">

          {/* Sidebar */}
          <FilterSidebar
            onCategoryChange={handleCategoryFilter}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Product Section */}
          <div className="flex-1">

            {/*  TOP INFO BAR (NEW – ONLY ADDITION) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 px-2">
              {/* Left */}
              <p className="text-sm text-gray-600">
                Showing 1–25 of {filteredProducts.length} result
              </p>

              {/* Right */}
              <div className="flex items-center gap-3">
                {/* Show */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show:</span>
                  <select className="border border-[#bee5f6] rounded-md px-2 py-1 focus:outline-none">
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Sort by:</span>
                  <select className="border border-[#bee5f6] rounded-md px-2 py-1 focus:outline-none">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-10 mt-5">
              {filteredProducts.map((p) => (
                <div className="" key={p.id}>
                  <div
                    className="flex flex-col gap-2 md:gap-5 p-1.5 md:p-4 rounded-xl md:rounded-[20px] bg-white border border-[#bee5f6] hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC]"
                  >
                    {/* Image */}
                    <Image
                      src={p.image as StaticImageData}
                      alt={p.name}
                      className="w-full rounded-lg md:rounded-[18px] object-cover"
                    />

                    <div className="flex flex-col gap-2 md:gap-4">
                      <div className="flex flex-col gap-2 md:gap-6 overflow-hidden">

                        {/* Title */}
                        <p className="w-full text-[14px] md:text-[22px] font-medium text-[#303030]">
                          {p.name}
                        </p>

                        {/* Price + Rating */}
                        <div className="flex flex-col md:flex-row justify-between md:items-center">

                          {/* Price */}
                          <div className="flex md:justify-center items-center gap-2">
                            <p className="text-[14px] md:text-2xl font-semibold text-[#2cace2]">
                              ৳{p.salePrice}
                            </p>
                            <p className="text-sm md:text-lg line-through text-[#808080]">
                              ৳{p.regularPrice}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <svg
                              width={17}
                              height={16}
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M7.69447 0.414678C7.87408 -0.138109 8.65613 -0.138109 8.83574 0.414678L10.3755 5.15369C10.4559 5.4009 10.6862 5.56828 10.9462 5.56828H15.9291C16.5103 5.56828 16.752 6.31205 16.2817 6.65369L12.2505 9.58256C12.0402 9.73534 11.9522 10.0062 12.0325 10.2534L13.5723 14.9924C13.7519 15.5452 13.1192 16.0048 12.649 15.6632L8.61778 12.7343C8.40749 12.5816 8.12273 12.5816 7.91243 12.7343L3.88119 15.6632C3.41096 16.0048 2.77828 15.5452 2.95789 14.9924L4.49768 10.2534C4.57801 10.0062 4.49001 9.73534 4.27972 9.58256L0.24848 6.65369C-0.221748 6.31205 0.0199172 5.56828 0.601151 5.56828H5.58404C5.84398 5.56828 6.07435 5.4009 6.15467 5.15369L7.69447 0.414678Z"
                                fill="#FFCE23"
                              />
                            </svg>

                            <p className="text-[12px] md:text-base text-[#505050]">
                              {p.rating}
                            </p>

                            <p className="text-[12px] md:text-base text-[#505050]">
                              ({p.reviewCount})
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-between items-center">

                        {/* Buy Now */}
                        <Link
                          href={`/products/${p.id}`}
                          className="flex items-center gap-1 xl:gap-2.5 px-1.5 xl:px-3 py-1.5 xl:py-2 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-[#2CACE2] group"
                        >
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[18px] xl:w-6 h-[18px] xl:h-6 relative text-[#303030] group-hover:text-white"
                          >
                            <path
                              d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          <p className="flex gap-1 text-[12px] xl:text-lg text-[#303030] group-hover:text-white">
                            Buy <span className="hidden xl:block">Now</span>
                          </p>
                        </Link>

                        {/* Cart + Wishlist */}
                        <div className="flex items-center gap-1 xl:gap-3">

                          {/* Add to cart */}
                          <button className="flex justify-center items-center w-8 xl:w-12 h-8 xl:h-12 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-[#2CACE2] group">
                            <svg
                              width={24}
                              height={24}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="w-[18px] xl:w-6 h-[18px] xl:h-6 text-[#303030] group-hover:text-white"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6" />
                              <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" />
                              <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" />
                              <circle cx="10.5" cy="20.5" r="1.5" />
                              <circle cx="17.5" cy="20.5" r="1.5" />
                            </svg>
                          </button>

                          {/* Wishlist */}
                          <button className="flex justify-center items-center w-8 xl:w-12 h-8 xl:h-12 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-[#2CACE2] group">
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                              className="w-[18px] xl:w-6 h-[18px] xl:h-6 text-[#303030] group-hover:text-white"
                            >
                              <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" />
                            </svg>
                          </button>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </CommonWrapper>
  );
}
