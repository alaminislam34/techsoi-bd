"use client";
import CommonWrapper from "@/components/layout/CommonWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";

export default function NavbarCategory() {
  const [allCategories, setAllCategories] = useState([]);
  const pathName = usePathname();
  const [activeFilter, setActiveFilter] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.CATEGORY_GET_ALL);
        if (res.status === 200) {
          setAllCategories(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div
      className="bg-[#eaf7fc] relative"
      onMouseLeave={() => setActiveFilter(null)}
    >
      <CommonWrapper>
        <div className="relative flex items-center group">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-20 p-1 bg-[#eaf7fc]/80 hover:text-primary lg:hidden"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Category List */}
          <div
            ref={scrollRef}
            className="flex items-center gap-4 md:gap-8 py-3 md:py-5 overflow-x-auto no-scrollbar scroll-smooth w-full px-6 md:px-0"
          >
            {allCategories.map((item, index) => (
              <div
                key={item.id}
                className="relative flex items-center gap-6 md:gap-8 shrink-0"
                onMouseEnter={() => setActiveFilter(index)}
              >
                <Link
                  href={`/products?category=${item.slug}`}
                  className={`md:text-lg font-medium whitespace-nowrap transition-colors ${
                    pathName === `/category/${item.slug}`
                      ? "text-primary font-semibold"
                      : "text-[#303030] hover:text-primary"
                  }`}
                >
                  {item.name}{" "}
                  <span className="h-12 w-0 border ml-4 border-primary/20"></span>{" "}
                </Link>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-20 p-1 bg-[#eaf7fc]/80 hover:text-primary lg:hidden"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </CommonWrapper>

      {/* Subcategory Dropdown */}
      {activeFilter !== null &&
        allCategories[activeFilter]?.subcategory?.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-40 shadow-xl border-t border-[#BEE5F6]">
            <div className="backdrop-blur-md bg-white/70 rounded-b-xl">
              <CommonWrapper>
                <div className="py-6 flex flex-col gap-2">
                  {allCategories[activeFilter].subcategory.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/category/${allCategories[activeFilter].slug}/${sub.slug}`}
                      className="md:text-base text-sm text-[#303030] hover:text-primary hover:font-medium transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </CommonWrapper>
            </div>
          </div>
        )}

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
