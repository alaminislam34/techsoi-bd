"use client";
import CommonWrapper from "@/components/layout/CommonWrapper";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import { toast } from "react-toastify"; // optional - for nice error messages

export default function NavbarCategory() {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState(null);
  const scrollRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const res = await axios.get(API_ENDPOINTS.CATEGORY_GET_ALL);

        if (res.status === 200 && res.data?.data) {
          setAllCategories(res.data.data);
        } else {
          throw new Error("Invalid category data format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setFetchError("Failed to load categories");
        toast.error("Failed to load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Handle main category click → redirect to products with category filter
  const handleMainCategoryClick = (e, category) => {
    e.preventDefault(); // prevent default link behavior
    router.push(`/products?category=${category.slug}`);
  };

  // Handle subcategory click → redirect to products with search query
  const handleSubCategoryClick = (e, subCategoryName) => {
    e.preventDefault();
    // You can also use sub.slug if your backend supports it better
    router.push(`/products?sub-category=${encodeURIComponent(subCategoryName)}`);
  };

  if (isLoading) {
    return (
      <div className="bg-[#eaf7fc] py-4">
        <CommonWrapper>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading categories...</span>
          </div>
        </CommonWrapper>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="bg-[#eaf7fc] py-4">
        <CommonWrapper>
          <div className="text-center text-red-600 text-sm">
            {fetchError} • Please refresh the page
          </div>
        </CommonWrapper>
      </div>
    );
  }

  return (
    <div
      className="bg-[#eaf7fc] relative"
      onMouseLeave={() => setActiveFilter(null)}
    >
      <CommonWrapper>
        <div className="relative flex items-center group">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-20 p-1 bg-[#eaf7fc]/80 hover:text-primary lg:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Category List */}
          <div
            ref={scrollRef}
            className="flex items-center gap-4 md:gap-8 py-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-6 md:px-0"
          >
            {allCategories.map((item, index) => (
              <div
                key={item.id}
                className="relative flex items-center gap-6 md:gap-8 shrink-0"
                onMouseEnter={() => setActiveFilter(index)}
              >
                {/* Main Category */}
                <Link
                  href={`/products?category=${item.slug}`}
                  onClick={(e) => handleMainCategoryClick(e, item)}
                  className={`md:text-lg font-medium whitespace-nowrap transition-colors ${
                    pathname.includes(`/products?category=${item.slug}`)
                      ? "text-primary font-semibold"
                      : "text-[#303030] hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Divider only if there are subcategories */}
                {item.subcategory?.length > 0 && (
                  <span className="h-12 w-0 border ml-4 border-primary/20 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-20 p-1 bg-[#eaf7fc]/80 hover:text-primary lg:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </CommonWrapper>

      {/* Subcategory Dropdown - only shows on hover */}
      {activeFilter !== null &&
        allCategories[activeFilter]?.subcategory?.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-40 shadow-xl border-t border-[#BEE5F6] bg-white/95 backdrop-blur-sm">
            <CommonWrapper>
              <div className="py-4 flex flex-col gap-2 ">
                {allCategories[activeFilter].subcategory.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/products?query=${encodeURIComponent(sub.name)}`}
                    onClick={(e) => handleSubCategoryClick(e, sub.name)}
                    className="text-sm md:text-base text-[#303030] hover:text-primary hover:font-medium transition-all duration-200 hover:underline underline-offset-4"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </CommonWrapper>
          </div>
        )}

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
