"use client";

import { Suspense } from "react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/productsComponent/FilterSidebar";
import Link from "next/link";
import { Menu, Heart, ShoppingCart } from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { useGetAllProducts, useFilterProducts } from "@/api/hooks/useProducts";
import { useAddToCart } from "@/api/hooks/useCart";
import { useAddToFavorites } from "@/api/hooks/useFavorites";
import { useAuth } from "@/Provider/AuthProvider";
import { toast } from "react-toastify";
import SafeImage from "@/components/ui/SafeImage";

// Loading fallback for Suspense
function ProductsLoading() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// 1. New Inner Component to handle searchParams safely
function ProductListContent() {
  const searchParams = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showPerPage, setShowPerPage] = useState(25);

  const [hasUserFiltered, setHasUserFiltered] = useState(false);

  const { data: productsResponse, isLoading, isError } = useGetAllProducts();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToFavorites } = useAddToFavorites();
  const { user } = useAuth();

  const products = productsResponse?.data || [];
  const categoryFromUrl = searchParams.get("category");
  const queryFromUrl = searchParams.get("query");
  const subCategoryFromUrl = searchParams.get("sub_category");

  const hasServerFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedBrands.length > 0 ||
    (queryFromUrl && queryFromUrl.trim().length > 0);

  // Call server-side filter when any id filter or query is present
  const {
    data: filteredResponse,
    isLoading: isFilterLoading,
    isFetching: isFilterFetching,
  } = useFilterProducts({
    query: queryFromUrl || "",
    categories: selectedCategories,
    subCategories: selectedSubCategories,
    brands: selectedBrands,
  });

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
      setSelectedSubCategories([]);
      setSelectedBrands([]);
      setHasUserFiltered(true);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    if (subCategoryFromUrl) {
      setSelectedSubCategories([subCategoryFromUrl]);
      setSelectedCategories([]);
      setSelectedBrands([]);
      setHasUserFiltered(true);
    }
  }, [subCategoryFromUrl]);

  useEffect(() => {
    if (
      selectedCategories.length > 0 ||
      selectedSubCategories.length > 0 ||
      selectedBrands.length > 0
    ) {
      setHasUserFiltered(true);
    }
  }, [selectedCategories, selectedSubCategories, selectedBrands]);

  const filteredProducts = useMemo(() => {
    const baseProducts = hasServerFilters
      ? filteredResponse?.data || []
      : products;

    let filtered = [...baseProducts];

    // Filter by query (only if no user filters)
    if (
      !hasUserFiltered &&
      queryFromUrl &&
      selectedCategories.length === 0 &&
      selectedSubCategories.length === 0 &&
      selectedBrands.length === 0
    ) {
      const searchTerm = queryFromUrl.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm) ||
          p.short_description?.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by price (skip when range is default)
    const isDefaultPriceRange =
      priceRange[0] === 0 && priceRange[1] === 1000000;
    if (!isDefaultPriceRange) {
      filtered = filtered.filter((p) => {
        const priceValue = Number(p.sale_price ?? p.regular_price ?? 0);
        return priceValue >= priceRange[0] && priceValue <= priceRange[1];
      });
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.sale_price - b.sale_price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.sale_price - a.sale_price);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [
    products,
    filteredResponse,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    priceRange,
    sortBy,
    queryFromUrl,
    hasUserFiltered,
    hasServerFilters,
  ]);
  const showLoading = hasServerFilters
    ? isFilterLoading || isFilterFetching
    : isLoading;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, showPerPage);
  }, [filteredProducts, showPerPage]);

  const handleCategoryFilter = (categories) => {
    setSelectedCategories(categories);
  };

  const handleSubCategoryFilter = (subCategories) => {
    setSelectedSubCategories(subCategories);
  };

  const handleBrandFilter = (brands) => {
    setSelectedBrands(brands);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 1000000 ||
    sortBy !== "newest";

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 1000000]);
    setSortBy("newest");
    setHasUserFiltered(false);
  };

  const handleAddToCart = (productId) => {
    if (!user) {
      toast.error("Please login first to add items to cart");
      return;
    }
    addToCart({ product_id: productId, quantity: 1 });
  };

  const handleAddToFavorites = (productId) => {
    if (!user) {
      toast.error("Please login first to add to favorites");
      return;
    }
    addToFavorites({ product_id: productId });
  };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar
        onCategoryChange={handleCategoryFilter}
        onSubCategoryChange={handleSubCategoryFilter}
        onBrandChange={handleBrandFilter}
        onPriceChange={(range) => setPriceRange(range)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile filter button */}
        <div className="md:hidden fixed top-32 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 cursor-pointer backdrop-blur-3xl rounded-lg bg-[#2cabe291] text-white shadow-md"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 px-2">
          <p className="text-sm text-gray-600">
            Showing 1–{paginatedProducts.length} of {filteredProducts.length}{" "}
            result
            {filteredProducts.length !== 1 ? "s" : ""}
            {!hasUserFiltered && (categoryFromUrl || queryFromUrl) && (
              <span className="ml-1">
                for "
                <span className="font-medium">
                  {queryFromUrl || categoryFromUrl}
                </span>
                "
              </span>
            )}
          </p>
          <p>{filteredProducts.length}</p>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs md:text-sm px-3 py-1.5 rounded-md border border-[#bee5f6] text-[#303030] hover:text-white hover:bg-primary transition"
              >
                Clear filters
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Show:</span>
              <select
                value={showPerPage}
                onChange={(e) => setShowPerPage(Number(e.target.value))}
                className="border border-[#bee5f6] rounded-md px-2 py-1 focus:outline-none"
              >
                <option value={12}>12</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-[#bee5f6] rounded-md px-2 py-1 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product grid */}
        {showLoading ? (
          <ProductsLoading />
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {hasUserFiltered
              ? "No products match your current filters"
              : categoryFromUrl || queryFromUrl
                ? `No products found for "${queryFromUrl || categoryFromUrl}"`
                : "No products found matching your criteria"}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-10 mt-5 pl-2">
            {paginatedProducts.map((p) => (
              <div className="h-full" key={p.id}>
                <div className="flex flex-col gap-2 justify-between md:gap-5 p-1.5 md:p-4 rounded-xl md:rounded-[20px] bg-white border border-[#bee5f6] hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_2px_10px_#72C7EC] hover:border-[#72C7EC] h-full">
                  <div className="space-y-4">
                    <Link href={`/products/${p.slug}`}>
                      <SafeImage
                        src={p.main_image}
                        alt={p.name}
                        width={400}
                        height={400}
                        unoptimized
                        className="w-full rounded-lg md:rounded-4.5 h-fit aspect-4/3 object-cover"
                      />
                    </Link>
                    <br />
                    <p className="w-full text-[14px] md:text-[16px] lg:text-4.5 font-medium text-[#303030] line-clamp-2">
                      {p.name}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-2 md:gap-4">
                    <div className="flex flex-col gap-2 md:gap-6 overflow-hidden">
                      <div className="flex flex-col md:flex-wrap md:flex-row justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] md:text-lg xl:text-xl font-semibold text-primary">
                            ৳{p.sale_price?.toLocaleString()}
                          </p>
                          <p className="text-sm lg:text-lg line-through text-[#808080]">
                            ৳{p.regular_price?.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <svg
                            width={17}
                            height={16}
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.69447 0.414678C7.87408 -0.138109 8.65613 -0.138109 8.83574 0.414678L10.3755 5.15369C10.4559 5.4009 10.6862 5.56828 10.9462 5.56828H15.9291C16.5103 5.56828 16.752 6.31205 16.2817 6.65369L12.2505 9.58256C12.0402 9.73534 11.9522 10.0062 12.0325 10.2534L13.5723 14.9924C13.7519 15.5452 13.1192 16.0048 12.649 15.6632L8.61778 12.7343C8.40749 12.5816 8.12273 12.5816 7.91243 12.7343L3.88119 15.6632C3.41096 16.0048 2.77828 15.5452 2.95789 14.9924L4.49768 10.2534C4.57801 10.0062 4.49001 9.73534 4.27972 9.58256L0.24848 6.65369C-0.221748 6.31205 0.0199172 5.56828 0.601151 5.56828H5.58404C5.84398 5.56828 6.07435 5.4009 6.15467 5.15369L7.69447 0.414678Z"
                              fill="#FFCE23"
                            />
                          </svg>

                          <p className="text-[12px] lg:text-sm text-[#505050]">
                            {p.average_rating ? p.average_rating.toFixed(1) : "0"}
                          </p>
                          <p className="text-[12px] lg:text-sm text-[#505050]">
                            ({p.total_reviews || 0})
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex items-center gap-1 xl:gap-2.5 px-1.5 xl:px-3 py-1.5 xl:py-2 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-primary group"
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4.5 xl:w-6 h-4.5 xl:h-6 relative text-[#303030] group-hover:text-white"
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
                          Buy Now
                        </p>
                      </Link>

                      <div className="flex items-center gap-1 xl:gap-3">
                        <button
                          onClick={() => handleAddToCart(p.id)}
                          className="flex justify-center items-center w-8 xl:w-12 h-8 xl:h-12 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-primary group transition-all"
                          title={user ? "Add to cart" : "Login to add to cart"}
                        >
                          <ShoppingCart className="w-4.5 xl:w-6 h-4.5 xl:h-6 text-[#303030] group-hover:text-white" />
                        </button>

                        <button
                          onClick={() => handleAddToFavorites(p.id)}
                          className="flex justify-center items-center w-8 xl:w-12 h-8 xl:h-12 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-primary group transition-all"
                          title={
                            user
                              ? "Add to favorites"
                              : "Login to add to favorites"
                          }
                        >
                          <Heart className="w-4.5 xl:w-6 h-4.5 xl:h-6 text-[#303030] group-hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <CommonWrapper>
      <div className="w-full py-10">
        <Suspense fallback={<ProductsLoading />}>
          <ProductListContent />
        </Suspense>
      </div>
    </CommonWrapper>
  );
}
