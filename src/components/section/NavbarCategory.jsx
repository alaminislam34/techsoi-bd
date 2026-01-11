"use client";
import CommonWrapper from "@/components/layout/CommonWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavbarCategory() {
  const parthName = usePathname();
  const [activeFilter, setActiveFilter] = useState(null);
  const scrollRef = useRef(null);

  // স্ক্রল ফাংশন
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const categories = [
    {
      to: "/category/laptop",
      label: "Laptop",
      sub_category: ["Lenovo", "HP", "Dell", "Asus", "Acer"],
    },
    {
      to: "/category/components",
      label: "PC Components",
      sub_category: ["Processor", "Motherboard", "RAM", "SSD", "Graphics Card"],
    },
    {
      to: "/category/monitor",
      label: "Monitor",
      sub_category: ["Gaming Monitor", "4K Monitor", "Curved Monitor"],
    },
    {
      to: "/category/casing",
      label: "Casing",
      sub_category: ["ATX Case", "Micro ATX", "Mini ITX"],
    },
    {
      to: "/category/accessories",
      label: "Accessories",
      sub_category: ["Webcam", "USB Hub", "Cooling Pad"],
    },
    {
      to: "/category/mouse",
      label: "Mouse",
      sub_category: ["Gaming Mouse", "Wireless Mouse"],
    },
    {
      to: "/category/keyboard",
      label: "Keyboard",
      sub_category: ["Mechanical", "Wireless", "RGB Keyboard"],
    },
    {
      to: "/category/headphone",
      label: "Headphone",
      sub_category: ["Gaming Headphone", "Bluetooth Headphone"],
    },
    {
      to: "/category/speaker",
      label: "Speaker",
      sub_category: ["Bluetooth Speaker", "Soundbar"],
    },
    {
      to: "/category/gaming",
      label: "Gaming",
      sub_category: ["Gaming Chair", "Gaming Desk"],
    },
    {
      to: "/category/cctv",
      label: "CCTV",
      sub_category: ["IP Camera", "DVR", "NVR"],
    },
  ];

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
            {categories.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center gap-6 md:gap-8 shrink-0"
                onMouseEnter={() => setActiveFilter(index)}
              >
                <Link
                  href={item.to}
                  className={`md:text-lg font-medium whitespace-nowrap transition-colors ${
                    parthName === item.to
                      ? "text-primary font-semibold"
                      : "text-[#303030] hover:text-primary"
                  }`}
                >
                  {item.label}{" "}
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

      {activeFilter !== null && (
        <div className="absolute top-full left-0 right-0 z-40 shadow-xl border-t border-[#BEE5F6]">
          <div className="backdrop-blur-md bg-white/70 rounded-b-xl">
            <CommonWrapper>
              <div className="py-6 flex flex-col gap-2">
                {categories[activeFilter].sub_category.map((sub, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="md:text-base text-sm text-[#303030] hover:text-primary hover:font-medium transition-all"
                  >
                    {sub}
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
